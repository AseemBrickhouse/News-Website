from rest_framework import viewsets
from .serializers import *
from .models import *
from rest_framework.response import Response
import datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
    
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().filter(isPrivate = False)
    serializer_class = ArticleSerializer

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

#Useless can remove
@api_view(['GET', 'POST']) 
def AccountCreation(request):
    if request.method == 'POST':
        queryset = User.objects.all()
        account = queryset[0]
        print(account)
        print(account.first_name)
    return Response(request.data)

class current_user(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        token = Token.objects.get(key=request.data['token'])
        account = User.objects.all().filter(id=token.user_id)[0].account
        data = {
            'first_name' : account.first_name,
            'last_name' : account.last_name,
            'creation_date' : account.creation_date,
            'role' : account.role,
            'phone' : account.phone,
        }
        return Response(data)

    def get(self, request):
        pass
