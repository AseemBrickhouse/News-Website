from rest_framework import status
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
        follow = request.data['person']
        token = Token.objects.get(key=request.headers['token'])
        if token == None:
            return Response({
                "Error" : "No current token. (Try loggin in or Creating an account! )"
            })
        user_account = User.objects.all().filter(id=token.user_id)[0].account
        following_user = Account.objects.all().filter(
                            first_name=follow['first_name'],
                            last_name=follow['last_name'],
                            email=follow['email'],
                        )[0]
        try:
            query = Followers.objects.get(
                account = user_account,
                following_user = following_user,
            )
            print(query)

        except Followers.DoesNotExist:            
            createFollow = Followers.objects.create(
                account= user_account,
                following_user = following_user,
            )
            createFollow.save()

        follow = following_user
        follow_json = AccountSerializer(follow).data
        follow_json['is_following'] = True
        follow_json['followers'] = len(Followers.objects.all().filter(following_user=following_user))
        return Response(follow_json)


class unFollow(ObtainAuthToken):
    def delete(self, request, *args, **kwargs):
        following = request.data['person']
        token = Token.objects.get(key=request.headers['token'])
        if token == None:
            return Response({
                "Error" : "No current token. (Try loggin in or Creating an account! )"
            })
        user_account = User.objects.all().filter(id=token.user_id)[0].account
        following_user = Account.objects.filter(
                            first_name=following['first_name'],
                            last_name=following['last_name'],
                            email=following['email']
                        )[0] 
        try:
            Followers.objects.get(
                account=user_account, 
                following_user=following_user
            ).delete()
        except Followers.DoesNotExist:
            print("Follow Object entry does not exists")
            return Response(request.data)

        following = following_user
        following_json = AccountSerializer(following).data
        following_json['is_following'] = False
        following_json['followers'] = len(Followers.objects.all().filter(following_user=following_user))
        return Response(following_json)

class myFollowers(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        print(request.data)
        myAccount = getCurrentUser(request.data['token'], "myFollowers")
        myFollowerList = Followers.objects.all().filter(following_user=myAccount)
        queryset = {}
        for follower in myFollowerList:
            account = follower.account
            queryset[AccountSerializer(account).data['key']] = AccountSerializer(account).data
            queryset[AccountSerializer(account).data['key']]['followers'] = getFollow(account, "FOLLOWERS")
            try:
                is_follower = Followers.objects.get(
                    account=myAccount, 
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
        myAccount = getCurrentUser(request.data['token'], "myFollowers")
        myFollowingList = Followers.objects.all().filter(account=myAccount)
        queryset = {}
        print(myFollowingList)
        for following in myFollowingList:
            account = following.following_user
            queryset[AccountSerializer(account).data['key']] = AccountSerializer(account).data
            queryset[AccountSerializer(account).data['key']]['followers'] = getFollow(account, "FOLLOWERS")
            try:
                is_following = Followers.objects.get(
                    account=myAccount, 
                    following_user=account,
                )
                queryset[AccountSerializer(account).data['key']]['is_following'] = True
            except Followers.DoesNotExist:
                queryset[AccountSerializer(account).data['key']]['is_following'] = False            
                
            queryset[AccountSerializer(account).data['key']]['written_articles']= len(Article.objects.all().filter(reporter_account=account))

        return Response(queryset)