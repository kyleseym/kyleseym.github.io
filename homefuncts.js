function playVid() {
    document.querySelector("#box").style.visibility = "hidden";
    document.querySelector("#result").style.visibility = "visible";
    document.getElementById("title").innerHTML = "This is one BAD AXE";
    document.getElementById("descript").innerHTML = "";
    document.getElementById("box1").innerHTML = "";
    document.getElementById("box2").innerHTML = "";
    var vid = document.createElement('video');
    vid.src ="images/Badaxe.mov"
    document.getElementById("descript").appendChild(vid);
    vid.play();
}

function showElement() {
    document.querySelector("#result").style.visibility = "hidden";
    document.querySelector("#box").style.visibility = "visible";
}

function handicap()
{
    document.getElementById("box1").innerHTML = "";
    document.getElementById("box2").innerHTML = "";
    document.querySelector("#result").style.visibility = "visible";
    let hcap = document.querySelector('#q').value;
    let name = "Maybe you should take up bowling!";
    if (hcap <= 10)
    {
        name = "Wow, you are good!";
    }
    else if (hcap <= 20)
    {
        name = "Your game is about like mine!";
    }

    let namebody = "So many tracks, so little time!";
    var elem1 = document.createElement("img");
    elem1.src = 'images/golfmaui.JPG';
    var elem2 = document.createElement("img");
    elem2.src = 'images/BAP30.jpg';
    document.querySelector("#title").innerHTML = name;
    document.querySelector("#descript").innerHTML = namebody;
    document.getElementById("box1").appendChild(elem1);
    document.getElementById("box2").appendChild(elem2);

}

function lounging()
{
    document.querySelector("#box").style.visibility = "hidden";
    document.getElementById("box1").innerHTML = "";
    document.getElementById("box2").innerHTML = "";
    let name = "Need I Say More?";
    let namebody = "";
    var elem1 = document.createElement("img");
    elem1.src = 'images/cabana.JPG';
    var elem2 = document.createElement("img");
    elem2.src = 'images/mauidrinks.jpg';
    document.querySelector("#title").innerHTML = name;
    document.querySelector("#descript").innerHTML = namebody;
    document.getElementById("box1").appendChild(elem1);
    document.getElementById("box2").appendChild(elem2);
}

function gardening()
{
    document.querySelector("#box").style.visibility = "hidden";
    document.getElementById("box1").innerHTML = "";
    document.getElementById("box2").innerHTML = "";
    let name = "Thumb is sore, not green!";
    let namebody = "Married a Master Gardener so I just do the manual labor and enjoy strolls in the Botanic Gardens!";
    var elem1 = document.createElement("img");
    elem1.src = 'images/Botrgarden.JPG';
    var elem2 = document.createElement("img");
    elem2.src = 'images/springgarden.jpg';
    document.querySelector("#title").innerHTML = name;
    document.querySelector("#descript").innerHTML = namebody;
    document.getElementById("box1").appendChild(elem1);
    document.getElementById("box2").appendChild(elem2);
}

function kimberly()
{
    document.getElementById("box1").innerHTML = "";
    document.getElementById("box2").innerHTML = "";
    let name = "Dr. Kimberly Helen Seymour";
    let namebody = "First Year resident MD in Med-Peds at the University of Rochester Hospital who hopes to cure cancer through a clinical practice in Oncology";
    document.querySelector("#title").innerHTML = name;
    document.querySelector("#descript").innerHTML = namebody;
    var elem1 = document.createElement("img");
    elem1.src = 'images/kimgrad.jpg';
    var elem2 = document.createElement("img");
    elem2.src = 'images/kimrh.jpg';
    document.getElementById("box1").appendChild(elem1);
    document.getElementById("box2").appendChild(elem2);

}

function daniel()
{
    document.getElementById("box1").innerHTML = "";
    document.getElementById("box2").innerHTML = "";
    let name = "Daniel Howard Seymour";
    let namebody = "A man of many talents who can make films, analyze complex financial instruments, and write software that will transform education as we know it";
    document.querySelector("#title").innerHTML = name;
    document.querySelector("#descript").innerHTML = namebody;
    var elem1 = document.createElement("img");
    elem1.src = 'images/dangrad.jpg';
    var elem2 = document.createElement("img");
    elem2.src = 'images/dan+gaeli.jpg';
    document.getElementById("box1").appendChild(elem1);
    document.getElementById("box2").appendChild(elem2);
}

function aj()
{
    document.getElementById("box1").innerHTML = "";
    document.getElementById("box2").innerHTML = "";
    let name = "Andrew Jack Seymour";
    let namebody = "Student at Syracuse University dual majoring in Public Relations and Sociology who hopes to bring about a more just world";
    document.querySelector("#title").innerHTML = name;
    document.querySelector("#descript").innerHTML = namebody;
    var elem1 = document.createElement("img");
    elem1.src = 'images/ajcuse.jpg';
    var elem2 = document.createElement("img");
    elem2.src = 'images/ajpr.jpg';
    document.getElementById("box1").appendChild(elem1);
    document.getElementById("box2").appendChild(elem2);
}

function diane()
{
    document.getElementById("box1").innerHTML = "";
    document.getElementById("box2").innerHTML = "";
    let name = "Diane Threadgill Seymour";
    let namebody = "A Mom who is so much more, devoting her time to care of others and to her passion for the garden";
    var elem1 = document.createElement("img");
    elem1.src = 'images/diane82.jpg';
    var elem2 = document.createElement("img");
    elem2.src = 'images/diane20.jpg';
    document.querySelector("#title").innerHTML = name;
    document.querySelector("#descript").innerHTML = namebody;
    document.getElementById("box1").appendChild(elem1);
    document.getElementById("box2").appendChild(elem2);
}

