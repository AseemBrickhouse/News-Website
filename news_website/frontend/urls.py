from django.urls import path
from .views import *

urlpatterns = [
    path('', index),
    path('Signup', index),
    path('Login', index),
]