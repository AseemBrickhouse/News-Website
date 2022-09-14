from .models import *
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
        print("Command needed user obj: ", command)
        return User.objects.all().filter(id=token.user_id)[0]
    except:
        print("Command needed account: ", command)
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

def setQuerySetData(key, op):
    pass
    # queryset= {}
    # queryset[op.data[key]] = op.data
    # return (queryset,op.data[key])
    #return (op.data[key], op.data)