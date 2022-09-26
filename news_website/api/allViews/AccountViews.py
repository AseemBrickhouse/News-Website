from rest_framework import viewsets
from ..serializers import *
from ..models import *
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from ..APIUtility import *

class current_user(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        print(request.data)
        try:
            account = getCurrentUser(request.data['token'], "CURRENTACCOUNT")
        except:
            return Response({'err': 'err msg'})

        try:
            popularArticles = PopularUserArticles(account)
            data = {
                'key' : account.key,
                'first_name' : account.first_name,
                'last_name' : account.last_name,
                'creation_date' : account.creation_date,
                'role' : account.role,
                'phone' : account.phone,
                'bio': account.bio,
                'email': account.email,
                'occupation': account.occupation,
                'profile_pic': account.profile_pic.url,
                'popular_articles': popularArticles,
                'written_articles': len(Article.objects.all().filter(reporter_account=account)),
                'followers': getFollow(account, "FOLLOWERS"),
                'following': getFollow(account, "FOLLOWING")
            }
            return Response(data)
        except:
            return Response(request.data)

    def get(self, request):
        pass

class AllAccounts(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        queryset = {}
        for account in Account.objects.all().exclude(user=getCurrentUser(request.data['token'], "ALLACCOUNTS")):
            queryset[AccountSerializer(account).data['user']] = AccountSerializer(account).data
            queryset[AccountSerializer(account).data['user']]['written_articles'] = len(Article.objects.all().filter(reporter_account=account))
            queryset[AccountSerializer(account).data['user']]['followers'] = getFollow(account, "FOLLOWERS")
            try:
                is_following = Followers.objects.get(
                   account=getCurrentUser(request.data['token'], "IS_FOLLOWING"), 
                    following_user=account,
                )
                queryset[AccountSerializer(account).data['user']]['is_following'] = True
            except Followers.DoesNotExist:
                queryset[AccountSerializer(account).data['user']]['is_following'] = False
            # queryset[AccountSerializer(account).data['user']]['is_following'] = Followers.objects.get(
            #                                                                                 account=getCurrentUser(request.data['token'], "IS_FOLLOWING"), 
            #                                                                                 following_user=account[0]
            #                                                                             )
        return Response(queryset)

class AccountCreation(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        currentUser = getCurrentUser(request.data['token'], "CREATEACCOUNT")
        print(currentUser , "-------------------------------------------------------------------------")
        account = Account.objects.create(
            user=currentUser,
            key=AccountKeyGen(3),
            first_name=request.data['first_name'],
            last_name=request.data['last_name'],
            email=request.data['email'],
        )
        account.save()
        # print(account)
        return Response(request.data)

    def get(self, request, *args, **kwargs):
        pass

class EditAccount(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        currentUser = getCurrentUser(request.data['token'], "EDITACCOUNT")
        Account.objects.filter(user=currentUser).update(
            first_name=request.data['first_name'] if request.data['first_name'] != "" else currentUser.account.first_name,
            last_name=request.data['last_name'] if request.data['last_name'] != "" else currentUser.account.last_name,
            phone=request.data['phone'] if request.data['phone'] != "" else currentUser.account.phone,
            bio=request.data['bio'] if request.data['bio'] != "" else currentUser.account.bio,
            email=request.data['email'] if request.data['email'] != "" else currentUser.account.email,
            occupation=request.data['occupation'] if request.data["occupation"] != "" else currentUser.account.email,
        )
        return Response(request.data)

    def get(self, request, *args, **kwargs):
        pass