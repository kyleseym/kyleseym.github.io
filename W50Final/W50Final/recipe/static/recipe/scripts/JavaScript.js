document.addEventListener('DOMContentLoaded', function () {

    // use event listener for new posts and button selections..
    document.querySelector('#add').addEventListener('click', () => new_recipe())
    document.querySelector('#edit').addEventListener('click', () => edit_recipe())
    document.querySelector('#adding').addEventListener('click', () => add_ingredient())
    document.querySelector('#send').addEventListener('click', () => compose())
    document.querySelector('#like').addEventListener('click', () => favorite())
    document.querySelectorAll('.link-button').forEach(button => {
        button.onclick = function () {
            title = this.dataset.recipe;
            get_recipe(title)
        }
    })
})


// New recipe function
function new_recipe() {
    document.querySelector('#default').style.display = "none";
    document.querySelector('#add').style.display = "none";
    document.querySelector('#edit').style.display = "none";
    document.querySelector('#like').style.display = 'none';
    document.querySelector('#send').style.display = 'block';
    document.querySelector('#compose').style.display = "block";
    document.querySelectorAll('.compose').forEach(item => {
        id = '#' + item.id;
        document.querySelector(id).disabled = false;
        document.querySelector(id).style.border = '1px gray solid';
        document.querySelector(id).style.backgroundColor = 'normal';
    })
}

function edit_recipe() {
    document.querySelector('#default').style.display = "none";
    document.querySelector('#add').style.display = "none";
    document.querySelector('#compose').style.display = "block";
    document.querySelector('#like').style.display = "none";
    document.querySelector('#send').style.display = 'block';
    document.querySelector('#edit').style.display = 'none';
    document.querySelector('#adding').style.display = 'inline-block'
    document.querySelector('#quantity').style.visibility = 'visible';
    document.querySelector('#unit').style.visibility = 'visible';
    document.querySelector('#ingredient').style.visibility = 'visible'
    document.querySelectorAll('.compose').forEach(item => {
        id = '#' + item.id;
        document.querySelector(id).disabled = false;
        document.querySelector(id).style.border = '1px solid gray';
        document.querySelector(id).style.backgroundColor = 'normal';
        new_recipe();
    })
    document.querySelectorAll('.btn_remove').forEach(enable => {
        id = '#' + enable.id;
        console.log('row id = ', id)
        document.querySelector(id).style.display = "inline-block";
    })
}

    // Get Recipe function
function get_recipe(title) {
    document.querySelector('#default').style.display = "none";
    document.querySelector('#add').style.display = "none";
    document.querySelector('#print').style.display = "block";
    document.querySelector('#compose').style.display = "block";
    document.querySelector('#like').style.display = "inline-block";
    document.querySelector('#send').style.display = 'none';
    document.querySelector('#edit').style.display = 'block';
    document.querySelector('#adding').style.display = 'none';
    document.querySelector('#author').style.display = 'inline-block';
    document.querySelector('#timestamp').style.display = 'inline-block';
    document.querySelector('#quantity').style.visibility = 'hidden';
    document.querySelector('#unit').style.visibility = 'hidden';
    document.querySelector('#ingredient').style.visibility = 'hidden'
    document.querySelectorAll('tbody').forEach(e => e.parentNode.removeChild(e));
    table = document.querySelector('#tablelist')
    var newbody = document.createElement("tbody");
    table.appendChild(newbody);
    document.querySelectorAll('.compose').forEach(item => {
        id = '#' + item.id;
        document.querySelector(id).disabled = true;
        document.querySelector(id).style.border = 'none';
        document.querySelector(id).style.backgroundColor = 'white';
    })
    fetch("recipe/" + title)
        .then(response => response.json())
        .then(recipe => {
            console.log(recipe)
            document.querySelector('#title').value = recipe[0][1];
            document.querySelector('#cat').value = recipe[1][0];
            document.querySelector('#comment').value = recipe[1][1];
            document.querySelector('#instruction').value = recipe[1][2];
            document.querySelector('#like').innerHTML = recipe[1][3];
            if (recipe[1][3] == 'Favorite') {
                document.querySelector('#like').style.backgroundColor = 'lightgreen';
            }
            else {
                document.querySelector('#like').style.backgroundColor = 'orangered';
            }
            document.querySelector('#author').innerHTML = recipe[0][0];
            document.querySelector('#timestamp').innerHTML = recipe[0][2];
            document.querySelector('#recipeid').value = recipe[0][3];
            for (var ing = 2, n = recipe.length; ing < n; ing++) {
                if (ing-1 < 7) {
                    var row = document.querySelector('#tablelist').insertRow()
                    row.insertCell(0).innerHTML = "-";
                    row.insertCell(1).innerHTML = recipe[ing][0];
                    row.insertCell(2).innerHTML = recipe[ing][1];
                    row.insertCell(3).innerHTML = recipe[ing][2];
                    row.insertCell(4).innerHTML = `<input type="button" onclick='selectRow(${ing - 2})' style="display: none" id="row${ing - 1}" class="btn_remove" value='x'>`;
                }
                else {
                    var row = document.querySelector('#tablelist2').insertRow()
                    row.insertCell(0).innerHTML = "-";
                    row.insertCell(1).innerHTML = recipe[ing][0];
                    row.insertCell(2).innerHTML = recipe[ing][1];
                    row.insertCell(3).innerHTML = recipe[ing][2];
                    row.insertCell(4).innerHTML = `<input type="button" onclick='selectRow2(${ing - 8})' style="display: none" id="row2${ing - 7}" class="btn_remove" value='x'>`;
                }

            }
            }).then(result => {
                console.log("Success", result);
                document.querySelector('#print').addEventListener('click', () => {
                    document.querySelector('#printtitle').value = title
                })
            })
}
   


function add_ingredient() {
    quantity = document.querySelector('#quantity').value;
    unit = document.querySelector('#unit').value
    ingredient = document.querySelector('#ingredient').value
    console.log(quantity, unit, ingredient)
    var table = document.querySelector('#tablelist')
    var table2 = document.querySelector('#tablelist2')
    if (table.rows.length < 6) {
        var row = document.querySelector('#tablelist').insertRow()
        row.insertCell(0).innerHTML = "-";
        row.insertCell(1).innerHTML = quantity;
        row.insertCell(2).innerHTML = unit;
        row.insertCell(3).innerHTML = ingredient;
        row.insertCell(4).innerHTML = `<input type="button" onclick='selectRow(this)' class="btn_remove" value='x'>`;
    }
    else {
        var row = document.querySelector('#tablelist2').insertRow()
        row.insertCell(0).innerHTML = "-";
        row.insertCell(1).innerHTML = quantity;
        row.insertCell(2).innerHTML = unit;
        row.insertCell(3).innerHTML = ingredient;
        row.insertCell(4).innerHTML = `<input type="button" onclick='selectRow2(this)' class="btn_remove" value='x'>`;
    }

    document.querySelector('#quantity').value = ''
    document.querySelector('#unit').value = ''
    document.querySelector('#ingredient').value = ''
    return
}

function selectRow(row) {
    document.querySelector('#tablelist').deleteRow(row)
}

function selectRow2(row) {
    document.querySelector('#tablelist2').deleteRow(row)
}

function compose() {
    recipeid = document.querySelector('#recipeid').value;
    title = document.querySelector('#title').value;
    category = document.querySelector('#cat').value;
    comment = document.querySelector('#comment').value;
    instruction = document.querySelector('#instruction').value
    ingredients = []
    var table = document.querySelector('#tablelist')
    for (var row = 0, n = table.rows.length; row < n; row++) {
        iq = table.rows[row].cells[1].innerHTML;
        iu = table.rows[row].cells[2].innerHTML;
        ii = table.rows[row].cells[3].innerHTML;
        ingredients.push([iq, iu, ii])
    }
    var table = document.querySelector('#tablelist2')
    for (var row = 0, n = table.rows.length; row < n; row++) {
        iq = table.rows[row].cells[1].innerHTML;
        iu = table.rows[row].cells[2].innerHTML;
        ii = table.rows[row].cells[3].innerHTML;
        ingredients.push([iq, iu, ii])
    }
    fetch('/compose', {
        method: 'POST',
        body: JSON.stringify({
            recipeid: recipeid,
            title: title,
            category: category,
            comment: comment,
            instruction: instruction,
            ingredients: ingredients
        })
    })
        .then(response => response.json())
        .then(result => {
            console.log("posting is done");
            window.location.reload()
        })
        
}

function catlist() {
    console.log("test of catlist")
    document.catselect.submit();
}    

// LIKE function
function favorite() {
    liked = document.querySelector('#like').innerHTML
    title = document.querySelector('#title').value
    if (liked == 'Add Favorite') {
        changeto = "like";
        document.querySelector('#like').style.backgroundColor = 'lightgreen';
        document.querySelector('#like').innerHTML = 'Favorite';
    }
    else {
        changeto = "unlike"
        document.querySelector('#like').style.backgroundColor = 'orangered';
        document.querySelector('#like').innerHTML = 'Add Favorite';
    }
    fetch('/favorite', {
        method: 'PUT',
        body: JSON.stringify({
            title: title,
            changeto: changeto,
        })
    }).then(response => {
        console.log("report from view", response);
        return
    })
}

// Printout recipe
function printout() {
    window.print(),
    window.location.replace('/'),
    window.location.reload

}