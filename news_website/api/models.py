from django.db import models
from django.contrib.auth.models import User

ROLES = (
    ("ADMIN", "ADMIN"),
    ("WRITER", "WRITER"),
    ("REGISTERED", "REGISTERED"),
    ("GUEST", "GUEST"),
)

class Account(models.Model):
    username = models.CharField(max_length=26)
    password = models.CharField(max_length=12)
    first_name = models.CharField(max_length=26)
    last_name = models.CharField(max_length=26)
    creation_date = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=10, choices=ROLES)
    phone = models.CharField(max_length=12, default="444-444-4444")
    
    def FullName(self):
            return self.first_name + self.last_name
    
class Settings(models.Model):
    assigned_user = models.ForeignKey(Account, on_delete=models.CASCADE)


class Article(models.Model):
    date = models.DateTimeField(auto_now_add=True) ##change to date field 
    headline = models.CharField(max_length=100)
    reporter_account = models.ForeignKey(Account, on_delete=models.CASCADE) #Reporter
    rating = models.IntegerField(null=True)
    isPrivate = models.BooleanField(null=True, default=False)
    article_description = models.CharField(max_length=200, null=True)
    
    def str(self):
            return self.reporter_account.FullName
    
class Followers(models.Model):
    account = models.ForeignKey(Account, related_name="following", on_delete=models.CASCADE)
    following_user = models.ForeignKey(Account, related_name="followers", on_delete=models.CASCADE)
    create = models.DateTimeField(auto_now_add=True)
