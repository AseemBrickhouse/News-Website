from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import *

class AccountSerializer(serializers.ModelSerializer):
     class Meta:
         model = Account
         fields = ('user',
                   'first_name', 
                   'last_name', 
                   'creation_date', 
                   'role',
                   'phone',
                   'bio',
                   'email',
                   'occupation',
                #    'popular_articles',
                   )

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id',
                  'date', 
                  'headline', 
                  'reporter_account', 
                  'rating',
                  'isPrivate',
                  'visibility',
                  'article_description',
                  'article_body',
                  'tags',
                  )


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 
                  'username', 
                  'password', 
                  'email'
                  )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        Account = Account.objects.create_user(
            validated_data['username'],
            validated_data['password'],
            validated_data['email'],
        )
        return Account