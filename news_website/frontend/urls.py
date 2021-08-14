from django.urls import path
from .views import *

urlpatterns = [
    path('', index),
    path('signup', index),
    path('login', index),
]