from django.contrib import admin
from .models import User, Recipe, Ingredient, Unit, Category, Detail, Favorite

# Register your models here.
class RecipeAdmin(admin.ModelAdmin):
    list_display = ("id", "author", "timestamp", "title", "category", "comment", "instructions")

class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "catname")

class IngredientsAdmin(admin.ModelAdmin):
    list_display = ("id", "items")

class UnitsAdmin(admin.ModelAdmin):
    list_display = ("id", "measure")

class DetailAdmin(admin.ModelAdmin):
    list_display = ("id", "recipe", "ingredients", "units", "quantity")

class FavoriteAdmin(admin.ModelAdmin):
    list_display = ("id", "liker", "recipe", "like")

admin.site.register(User)
admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Ingredient, IngredientsAdmin)
admin.site.register(Unit, UnitsAdmin)
admin.site.register(Detail, DetailAdmin)
admin.site.register(Favorite, FavoriteAdmin)