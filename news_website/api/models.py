from pyexpat import model
from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.conf import settings
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import AbstractBaseUser
from multiselectfield import MultiSelectField

ROLES = (
    ("ADMIN", "ADMIN"),
    ("WRITER", "WRITER"),
    ("REGISTERED", "REGISTERED"),
    ("GUEST", "GUEST"),
)
TAGS = (
    ("Science", "Science"),
    ("Technology", "Technology"),
    ("Work", "Work"),
    ("School", "School"),
    ("Life", "Life"),
    ("Space", "Space"),
    ("Outdoors", "Outdoors"),
)

VISIBILITY = (
    ("PUBLIC","PUBLIC"),
    ("FOLLOWER/SUBSCRIBER ONLY","FOLLOWER/SUBSCRIBER ONLY"),
    ("PRIVATE","PRIVATE"),
)

class Account(models.Model):
    key = models.CharField(max_length=32, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    first_name = models.CharField(max_length=26)
    last_name = models.CharField(max_length=26)
    creation_date = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=10, choices=ROLES, blank=True)
    phone = models.CharField(max_length=12, default="444-444-4444")
    bio = models.TextField(null=True, blank=True)
    email = models.EmailField(max_length=50, null=True)
    profile_pic = models.ImageField(blank=True, null=True,)
    occupation = models.CharField(max_length=30, null=True, blank=True)

    def FullName(self):
            return self.first_name + self.last_name
    
class Settings(models.Model):
    assigned_user = models.ForeignKey(Account, on_delete=models.CASCADE)


class Article(models.Model):
    key = models.CharField(max_length=20, null=True)
    date = models.DateTimeField(auto_now_add=True, null=True) ##change to date field 
    headline = models.CharField(max_length=100)
    sub_title = models.CharField(max_length=200, null=True, blank=True)
    reporter_account = models.ForeignKey(Account, on_delete=models.CASCADE) #Reporter
    rating = models.IntegerField(null=True)
    isPrivate = models.BooleanField(null=True, default=False)
    visibility = models.CharField(choices=VISIBILITY, null=True, default=False, max_length=24)
    article_description = models.CharField(max_length=500, null=True)
    article_body = models.TextField(max_length=10000, null=True)
    tags = MultiSelectField(choices=TAGS, max_choices=7, max_length=20000, null=True, blank=True)
    article_pic = models.ImageField(blank=True, null=True)

    def str(self):
            return self.reporter_account.FullName
    
class Followers(models.Model):
    account = models.ForeignKey(Account, related_name="following", on_delete=models.CASCADE)
    following_user = models.ForeignKey(Account, related_name="followers", on_delete=models.CASCADE)
    create = models.DateTimeField(auto_now_add=True)

class BookmarkedArticles(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    saved = models.ForeignKey(Article, on_delete=models.CASCADE)
    create = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    commenter_account = models.ForeignKey(Account, on_delete=models.CASCADE)
    commented_article =  models.ForeignKey(Article,on_delete=models.CASCADE)
    content = models.TextField()
    parent = models.ForeignKey('self' , null=True , blank=True , on_delete=models.CASCADE , related_name='replies')
    created_at = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(default=0)
    
    class Meta:
        ordering=['-created_at']

    def __str__(self):
        return str(self.commenter_account) + ' comment ' + str(self.content)

    @property
    def children(self):
        return Comment.objects.filter(parent=self).reverse()

    @property
    def is_parent(self):
        if self.parent is None:
            return True
        return False
    