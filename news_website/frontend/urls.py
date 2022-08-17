from django.urls import path
from .views import *

urlpatterns = [
    path('', index),
    path('SignUp', index),
    path('Login', index),
    path('Account', index),
]