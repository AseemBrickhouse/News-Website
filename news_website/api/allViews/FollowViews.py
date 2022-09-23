from rest_framework import viewsets
from ..serializers import *
from ..models import *
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from ..APIUtility import *

class Follow(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        follow = request.data['toFollow']
        try:
            query = Followers.objects.get(
                account = getCurrentUser(request.data['token'], "FOLLOW"),
                following_user = Account.objects.all().filter(
                    first_name=follow['first_name'],
                    last_name=follow['last_name'],
                    email=follow['email'],
                )[0]
            )
            print(query)

        except Followers.DoesNotExist:            
            createFollow = Followers.objects.create(
                account= getCurrentUser(request.data['token'], "FOLLOW"),
                following_user = Account.objects.all().filter(
                    first_name=follow['first_name'],
                    last_name=follow['last_name'],
                    email=follow['email']
                )[0]
            )
            createFollow.save()
        return Response(request.data)

class unFollow(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        following = request.data['toUnFollow']
        account = getCurrentUser(request.data['token'], "UNFOLLOW")
        Followers.objects.get(account=account, 
                                following_user=Account.objects.get(
                                first_name=following['first_name'],
                                last_name=following['last_name'],
                                email=following['email']
                            )).delete()
        return Response(request.data)

class myFollowers(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        print(request.data)
        account = getCurrentUser(request.data['token'], "myFollowers")
        myFollowerList = Followers.objects.all().filter(following_user=account)
        queryset = {}
        for follower in myFollowerList:
            account = follower.account
            queryset[AccountSerializer(account).data['key']] = AccountSerializer(account).data
            queryset[AccountSerializer(account).data['key']]['followers'] = getFollow(account, "FOLLOWERS")
            try:
                is_following = Followers.objects.get(
                   account=getCurrentUser(request.data['token'], "IS_FOLLOWING"), 
                    following_user=account,
                )
                queryset[AccountSerializer(account).data['key']]['is_following'] = True
            except Followers.DoesNotExist:
                queryset[AccountSerializer(account).data['key']]['is_following'] = False

            queryset[AccountSerializer(account).data['key']]['written_articles'] = len(Article.objects.all().filter(reporter_account=account))

        return Response(queryset)

class myFollowing(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        print(request.data)
        account = getCurrentUser(request.data['token'], "myFollowers")
        myFollowingList = Followers.objects.all().filter(account=account)
        queryset = {}
        print(myFollowingList)
        for followering in myFollowingList:
            account = followering.following_user
            queryset[AccountSerializer(account).data['key']] = AccountSerializer(account).data
            queryset[AccountSerializer(account).data['key']]['written_articles']= {}
            articles = Article.objects.all().filter(reporter_account=account)
            for article in articles:
                data = ArticleSerializer(article).data
                queryset[AccountSerializer(account).data['key']]['written_articles'][data['key']] = data

        return Response(queryset)