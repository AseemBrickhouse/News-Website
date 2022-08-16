from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status, permissions, viewsets
from rest_framework.fields import DateField
from .serializers import *
from .models import *
# from rest_framework.views import APIViews
from rest_framework.response import Response
from knox.models import AuthToken
import datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
# class AccountViewSet(viewsets.ModelViewSet):
#     permission_classes = [
#         permissions.IsAuthenticated
#     ]
#     serializer_class = AccountSerializer
#     def get_queryset(self):
#         return self.request.user.accounts.all()

#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)

# class AccountViewSet(viewsets.ModelViewSet):
#     queryset = Account.objects.all()
#     permission_classes=[
#         permissions.AllowAny
#     ]
#     serializer_class = AccountSerializer
    


# class RegisterView(generics.GenericAPIView):
#     serializer_class = RegisterSerializer
     
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)

#         user = serializer.save()

#         return Response({
#             "user": AccountSerializer(user, context=self.get_serializer_context()).data,
#             "token": AuthToken.objects.create(user)
#         })

# class ArticleViewSet(viewsets.ModelViewSet):
#     articles = []
#     aa = Article.objects.all()
#     for entry in aa:
#         if entry.isPrivate == False:
#             articles.append(entry)

#     def get(self, request):
#         return self.request.articles

    
# class AccountViewSet(generics.ListCreateAPIView):
#     queryset = Account.objects.all()
#     serializer_class = AccountSerializer

# class ArticleViewSet(generics.ListCreateAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
    
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().filter(isPrivate = False)
    serializer_class = ArticleSerializer

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

@api_view(['GET', 'POST']) 
def AccountCreation(request):
    if request.method == 'POST':
        queryset = User.objects.all()
        account = queryset[0]
        print(account)
        print(account.first_name)
        # print(queryset)
        # print(request.data)
        # for account in queryset:
        #     if(account.email == request.data['email']):
        #         print("equal")
        #         account = Account.objects.create(
        #             user = account,
        #             username = account.username,
        #             password = "xxx",
        #             first_name = "xxx",
        #             last_name = "xxx"
        #         )
        #         account.save()
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
        #print(data)
        return Response(data)

    def get(self, request):
        pass
