from django.db import models
from django.contrib.auth.models import User

class Settings(models.Model):
    assigned_user = models.ForeignKey(User, on_delete=models.CASCADE)


class Article(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    headline = models.CharField(max_length=100)
    reporter = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(null=True)
    isPrivate = models.BooleanField(null=True, default=False)
    article_description = models.CharField(max_length=200, null=True)
    
class Followers(models.Model):
    user = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)
    following_user = models.ForeignKey(User, related_name="followers", on_delete=models.CASCADE)
    create = models.DateTimeField(auto_now_add=True)

class Account(models.Model):
    owner = models.ForeignKey(User, related_name="Account", on_delete=models.CASCADE, null=True)
    first_name = models.CharField(max_length=26)
    last_name = models.CharField(max_length=26)
    creation_date = models.DateTimeField(auto_now_add=True)
    phone = models.CharField(max_length=12, default="444-444-4444")