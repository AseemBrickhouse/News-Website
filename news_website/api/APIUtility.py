from .models import *
from rest_framework.authtoken.models import Token

def attachNameToArticle(Article):
    account = Account.objects.all().filter(id=Article.data['reporter_account'])
    return account[0].first_name + " " + account[0].last_name

def getCurrentUser(token, command):
    token = Token.objects.get(key=token)
    commands = ["CREATEACCOUNT", "EDITACCOUNT"]
    try: 
        commands.index(command)
        print("in if Returing....")
        return User.objects.all().filter(id=token.user_id)[0]
    except:
        print("In Except getting account")
        return User.objects.all().filter(id=token.user_id)[0].account

