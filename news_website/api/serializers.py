from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import *

class AccountSerializer(serializers.ModelSerializer):
     class Meta:
         model = Account
         fields = ('user',
                   'key',
                   'first_name', 
                   'last_name', 
                   'creation_date', 
                   'role',
                   'phone',
                   'bio',
                   'email',
                   'occupation',
                   'profile_pic',
                #    'popular_articles',
                   )

class ArticleSerializer(serializers.ModelSerializer):
    article_body = serializers.CharField(trim_whitespace=False)

    class Meta:
        model = Article
        fields = ('id',
                  'key',
                  'date', 
                  'headline', 
                  'sub_title',
                  'reporter_account', 
                  'rating',
                  'isPrivate',
                  'visibility',
                  'article_description',
                  'article_body',
                  'tags',
                  'article_pic'
                  )


# class RegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Account
#         fields = ('id', 
#                   'username', 
#                   'password', 
#                   'email'
#                   )
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         Account = Account.objects.create_user(
#             validated_data['username'],
#             validated_data['password'],
#             validated_data['email'],
#         )
#         return Account