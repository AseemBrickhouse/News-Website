from django.urls import path
from .views import *

urlpatterns = [
    path('', index),
    path('SignUp', index),
    path('Account/Profile', index),
    path('Account/Articles', index),
    path('Account/Followers', index),
    path('Login', index),
    path('Account', index),
]