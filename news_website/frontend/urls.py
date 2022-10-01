from os import stat
from django.urls import path
from django.conf.urls import url
from .views import *

urlpatterns = [
    path('', index),
    path('SignUp', index),
    path('Account/Profile', index),
    path('Account/EditAccount', index),
    path('Account/Articles', index),
    path('Account/CreateArticle/', index),
    path('Account/FindPeople', index),
    path('Account/Followers', index),
    path('Account/Following', index),
    path('Account/SavedArticles', index),
    path('Login', index),
    path('Account', index),
    url(r'Articles/(?P<key>[a-zA-Z0-9]+.*)', index),
    url(r'Account/People/(?P<key>[a-zA-Z0-9]+.*)', index),
]