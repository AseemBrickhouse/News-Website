from django.urls import path
from django.conf.urls import url
from .views import *

urlpatterns = [
    path('', index),
    path('SignUp', index),
    path('Account/Profile', index),
    path('Account/Articles', index),
    path('Account/CreateArticle/', index),
    path('Account/Followers', index),
    path('Login', index),
    path('Account', index),
    url(r'Articles/(?P<id>[a-zA-Z0-9]+.*)', index)
]