import json
from django.http import JsonResponse
from django.shortcuts import render
from datetime import datetime
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.db.models import Count
from django.http import HttpResponse, HttpResponseRedirect, HttpRequest
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import Recipe, Ingredient, Category, Unit, Detail, User, Favorite

@csrf_exempt
@login_required
def index(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    recipes = Recipe.objects.filter().order_by('title')
    categories = Category.objects.filter().order_by('catname')
    units = Unit.objects.filter()
    ingredients = Ingredient.objects.filter()

    paginator = Paginator(recipes, 10) # Show 10 contacts per page.
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(
        request,
        'recipe/index.html',
        {
            'title':'Home Page',
            'year':datetime.now().year,
            'categories': categories,
            'units': units,
            'ingredients': ingredients,
            'page_obj': page_obj,
            'Category': 'All Recipes',
        }
    )


@csrf_exempt
@login_required
def compose(request):

    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)
    data = json.loads(request.body)
    # check for new category
    category = data.get("category", "")
    categories = Category.objects.filter().order_by('catname')
    catlist = []
    for cat in categories:
        catlist.append(cat.catname)
    if category not in catlist:
        Category.objects.create(catname=category)

    # check for new unit and ingredient - add if not there
    ingredients = data.get("ingredients", "")
    units = Unit.objects.filter()
    unitlist = []
    for unit in units:
        unitlist.append(unit.measure)
    ings = Ingredient.objects.filter()
    inglist = []
    for ing in ings:
        inglist.append(ing.items)
    for item in ingredients:
        if item[1] not in unitlist:
            Unit.objects.create(measure=item[1])
        if item[2] not in inglist:
            Ingredient.objects.create(items=item[2])
    
    # check if recipe is new or edit        
    recipeid = data.get("recipeid", "")
    title = data.get("title", "")
    comment = data.get("comment", "")
    instruction = data.get("instruction", "")
    ingredients = data.get("ingredients", "")
    if recipeid == 'None':
        posting = Recipe(
            title=title,
            author=request.user,
            category=Category.objects.get(catname=category),
            comment=comment,
            instructions=instruction,            
            )
        posting.save()
        recipe = Recipe.objects.get(title=title) 
        for item in ingredients:
            postdetail = Detail(
                recipe=recipe,
                ingredients=Ingredient.objects.get(items=item[2]),
                units = Unit.objects.get(measure=item[1]),
                quantity=item[0]
                )
            postdetail.save()
    else:
        recipe = Recipe.objects.get(id=recipeid)
        if recipe.title != title:
            recipe.title = title;
        catcheck = recipe.category.catname
        if catcheck != category:
            recipe.category = Category.objects.get(catname=category)
        if recipe.comment != comment:
            recipe.comment = comment
        if recipe.instructions != instruction:
            recipe.instructions = instruction
        recipe.save();

        recipe_details = Detail.objects.filter(recipe__id=recipeid)
        recipe_details.delete()
        recipe = Recipe.objects.get(title=title) 
        for item in ingredients:
            postdetail = Detail(
                recipe=recipe,
                ingredients=Ingredient.objects.get(items=item[2]),
                units = Unit.objects.get(measure=item[1]),
                quantity=item[0]
                )
            postdetail.save()

    return JsonResponse({"message": "Post sent successfully."}, status=201)

def get_recipe(request, title):
    recipe = Recipe.objects.get(title=title)
    recipe_details = []
    recipeid = recipe.id
    author = User.objects.get(username=recipe.author).username
    timestamp = recipe.timestamp.strftime("%b %d %Y, %I:%M %p")
    recipe_details.append([author, title, timestamp, recipeid])
    category = Category.objects.get(mixer__title=recipe.title).catname
    comment = recipe.comment
    instructions = recipe.instructions
    try:
        favorite = Favorite.objects.get(recipe=recipe)
        like = favorite.like
    except:
        like = False 
    if like == True:
       like = 'Favorite'
    else:
       like = 'Add Favorite'
    recipe_details.append([category, comment, instructions, like])
    details = Detail.objects.filter(recipe=recipe)     
    for item in details:
        quantity = item.quantity
        units = item.units.measure
        ingredient = item.ingredients.items
        recipe_details.append([quantity, units, ingredient])

    return JsonResponse(recipe_details, safe=False)

@csrf_exempt
def cat(request):
    category = request.POST.get("category")
    if category == None or category == "All Recipes":
        recipes = Recipe.objects.filter().order_by('title')       
    elif category == "My Favorites":
        recipes = Recipe.objects.filter(likedit__liker=request.user, likedit__like=True).order_by('title')
    else:
        recipes = Recipe.objects.filter(category__catname=category).order_by('title')
    categories = Category.objects.filter().order_by('catname')
    units = Unit.objects.filter()
    ingredients = Ingredient.objects.filter()

    paginator = Paginator(recipes, 10) # Show 10 contacts per page.
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(
        request,
        'recipe/index.html',
        {
            'title':'Home Page',
            'year':datetime.now().year,
            'categories': categories,
            'units': units,
            'ingredients': ingredients,
            'page_obj': page_obj,
            'Category': category,
        }
    )


@csrf_exempt
@login_required
def favorite(request):
    data = json.loads(request.body)
    user=request.user
    title = data.get('title','')
    changeto=data.get("changeto", "")
    recipe = Recipe.objects.get(title=title)
    if changeto == "like":
        like = True
    else:
        like = False
    try:
        favorites = Favorite.objects.get(recipe=recipe.id, liker=user)
    except:
        addfavorite = Favorite(
            liker=user,
            recipe=recipe,
            like=like,
        )  
        addfavorite.save() 
        return HttpResponse(status=404)
    if favorites.like == like:
        return HttpResponse(status=304)
    else:
        favorites.like = like
        favorites.save()
    return HttpResponse(status=204)

@csrf_exempt
def printrecipe(request):
    title = request.POST.get('printtitle')
    recipe = Recipe.objects.get(title=title)
    recipeid = recipe.id
    author = User.objects.get(username=recipe.author).username
    timestamp = recipe.timestamp.strftime("%b %d %Y, %I:%M %p")
    category = Category.objects.get(mixer__title=recipe.title).catname
    comment = recipe.comment
    instructions = recipe.instructions
    table1 = []
    table2 = []
    details = Detail.objects.filter(recipe=recipe)
    for i in range(int(len(details)/2)):
        table1.append(details[i])
    for i in range(int(len(details)/2) + 1, len(details)):
        table2.append(details[i])
    return render(request, 'recipe/printrecipe.html', {
        'title': title,
        'author': author,
        'timestamp': timestamp,
        'category': category,
        'comment': comment,
        'instructions': instructions,
        'table1': table1,
        'table2': table2
        })
