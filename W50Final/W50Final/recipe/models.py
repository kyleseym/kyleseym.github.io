from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Category(models.Model):
    catname = models.CharField(max_length=64, unique=True)

class Unit(models.Model):
    measure = models.CharField(max_length=64, unique=True)

class Ingredient(models.Model):
    items = models.CharField(max_length=64, unique=True)

class Recipe(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="creator")
    timestamp = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=64)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True, related_name="mixer")
    comment = models.CharField(max_length=255, null=True, blank=True, default=None)
    instructions = models.CharField(max_length=255, null=True, blank=True, default=None)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            }
    
    def __str__(self):
        return f"{self.author} {self.timestamp} {self.title} {self.category.catname}"

class Detail(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredients = models.ForeignKey(Ingredient, on_delete=models.CASCADE, related_name="stuff")
    units = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name="amount", null=True, blank=True, default=None)
    quantity = models.CharField(max_length=64, null=True, blank=True, default=None )

    def __str__(self):
        return f"{self.recipe.title}"

class Favorite(models.Model):
    liker = models.ForeignKey(User, on_delete=models.CASCADE, related_name="gourmet")
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="likedit")
    like = models.BooleanField(blank=False, null=False, default=False)