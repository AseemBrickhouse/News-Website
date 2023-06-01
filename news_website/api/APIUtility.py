from .models import *
from .serializers import *
from rest_framework.authtoken.models import Token

import random
import string

def attachNameToArticle(Article):
    account = Account.objects.all().filter(id=Article.data['reporter_account'])
    return account[0].first_name + " " + account[0].last_name

def getCurrentUser(token, command):
    token = Token.objects.get(key=token)
    commands = ["CREATEACCOUNT", "EDITACCOUNT", "ALLACCOUNTS"]
    try: 
        commands.index(command)
        # print("Command needed user obj: ", command)
        return User.objects.all().filter(id=token.user_id)[0]
    except:
        # print("Command needed account: ", command)
        return User.objects.all().filter(id=token.user_id)[0].account


def ArticleKeyGen(chars = string.ascii_uppercase + string.digits, N=20):
	return ''.join(random.choice(chars) for _ in range(N))

def AccountKeyGen(size):
    key = ""
    return "-".join(AccountKeyHelp() for _ in range(size))

def AccountKeyHelp(chars = string.ascii_uppercase + string.digits, N=10):
	return ''.join(random.choice(chars) for _ in range(N))

def getFollow(account, op):
    if op == "FOLLOWERS":
        return len(Followers.objects.all().filter(following_user=account))
    if op == "FOLLOWING":
        return len(Followers.objects.all().filter(account=account))

def PopularUserArticles(account):
    queryset = Article.objects.all().filter(reporter_account=account).order_by('rating').reverse()[:2]
    popular_articles = {}
    for article in queryset:
        convertedArticle = ArticleSerializer(article)
        popular_articles[convertedArticle.data['id']] = convertedArticle.data
    return(popular_articles)


def get_user_account(token):
    try:
        token = Token.objects.get(key=token)
        print(token)
        user_account = User.objects.all().filter(id=token.user_id)[0].account
        return user_account
    except Token.DoesNotExist:
         return None

