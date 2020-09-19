"""
Definition of urls for W50Final.
"""

from datetime import datetime
from django.urls import path
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from recipe import forms, views


urlpatterns = [
    path('', views.index, name='home'),
    path('accounts/login/',
         LoginView.as_view
         (
             template_name='recipe/login.html',
             authentication_form=forms.BootstrapAuthenticationForm,
             extra_context=
             {
                 'title': 'Log in',
                 'year' : datetime.now().year,
             }
         ),
         name='login'),
    path('logout/', LogoutView.as_view(next_page='/'), name='logout'),
    path('compose', views.compose, name='compose'),
    path('recipe/<str:title>', views.get_recipe, name='recipe'),
    path('cat', views.cat, name='cat'),
    path('favorite', views.favorite, name='favorite'),
    path('printrecipe', views.printrecipe, name='printrecipe')
]

