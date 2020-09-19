"""
Definition of urls for W50Final.
"""

from django.contrib import admin
from django.urls import include, path
from django.conf.urls import url
from django.views.generic import RedirectView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("recipe.urls")),
    url(r'^favicon\.ico$',RedirectView.as_view(url='/static/images/favicon.ico')),
]