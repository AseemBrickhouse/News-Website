from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import *

class AccountSerializer(serializers.ModelSerializer):
     class Meta:
         model = Account
         fields = ('id', 'owner', 'first_name', 'last_name', 'creation_date', 'phone')

class Article(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('date', 'headline', 'reporter', 'rating')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['password'],
            validated_data['email'],
        )
        return user