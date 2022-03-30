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
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    
    
