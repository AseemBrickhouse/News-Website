from rest_framework import status
from ..serializers import *
from ..models import *
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from ..APIUtility import *


class current_user(ObtainAuthToken):
    def get(self, request, *args, **kwargs):
        user_account = get_user_account(request.headers['token'])
        if (user_account == None):
            return Response({
                "Err": "User account not found"
            },
                status=status.HTTP_404_NOT_FOUND)

        user_data = AccountSerializer(user_account).data
        user_data['profile_pic'] = user_account.profile_pic.url if user_account.profile_pic != None else "/images/defaultProfilePic.png",
        user_data['popular_articles'] = PopularUserArticles(user_account)
        user_data['written_articles'] = len(Article.objects.all().filter(reporter_account=user_account))
        user_data['followers'] = getFollow(user_account, "FOLLOWERS")
        user_data['following'] = getFollow(user_account, "FOLLOWING")

        return Response(user_data)


class AllAccounts(ObtainAuthToken):
    def get(self, request, *args, **kwargs):
        user_account = get_user_account(request.headers['token'])
        if (user_account == None):
            return Response({
                "Err": "User account not found"
            },
                status=status.HTTP_404_NOT_FOUND)
        queryset = {}
        for account in Account.objects.all().exclude(key=user_account.key):
            queryset[AccountSerializer(account).data['user']] = AccountSerializer(account).data
            queryset[AccountSerializer(account).data['user']]['key'] = AccountSerializer(account).data['key']
            queryset[AccountSerializer(account).data['user']]['written_articles'] = len(Article.objects.all().filter(reporter_account=account))
            queryset[AccountSerializer(account).data['user']]['followers'] = getFollow(account, "FOLLOWERS")
            try:
                Followers.objects.get(
                    account=user_account,
                    following_user=account,
                )
                queryset[AccountSerializer(account).data['user']]['is_following'] = True
            except Followers.DoesNotExist:
                queryset[AccountSerializer(account).data['user']]['is_following'] = False

        return Response(queryset)


class AccountCreation(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        token = Token.objects.get(key=request.headers['token'])
        if (token == None):
            return Response({
                "Err": "Token not found"
            },
                status=status.HTTP_404_NOT_FOUND)
        
        current_user_object = User.objects.all().filter(id=token.user_id)[0]
        try:
            account = Account.objects.get(
                email=request.data['email'],
            )
            return Response({
                    "Err": "Email already in user",
                },
                status=status.HTTP_400_BAD_REQUEST)
        
        except Account.DoesNotExist:
            account = Account.objects.create(
                user=current_user_object,
                key=AccountKeyGen(3),
                first_name=request.data['first_name'],
                last_name=request.data['last_name'],
                email=request.data['email'],
            )
            account.save()
            return Response(AccountSerializer(account).data, status=status.HTTP_201_CREATED)


class EditAccount(ObtainAuthToken):
    def put(self, request, *args, **kwargs):
        user_account = get_user_account(request.headers['token'])
        if (user_account == None):
            return Response({
                "Err": "User account not found"
            },
                status=status.HTTP_404_NOT_FOUND)
        
        Account.objects.filter(key=user_account.key).update(
            first_name=request.data['first_name'] if request.data['first_name'] != "" else user_account.account.first_name,
            last_name=request.data['last_name'] if request.data['last_name'] != "" else user_account.account.last_name,
            phone=request.data['phone'] if request.data['phone'] != "" else user_account.account.phone,
            bio=request.data['bio'] if request.data['bio'] != "" else user_account.account.bio,
            email=request.data['email'] if request.data['email'] != "" else user_account.account.email,
            occupation=request.data['occupation'] if request.data["occupation"] != "" else user_account.account.email,
        )

        return Response(
            AccountSerializer(user_account.account).data,
            status=status.HTTP_201_CREATED,
        )

class GetPerson(APIView):
    def get(self, request, *args, **kwargs):
        user_account = get_user_account(request.headers['token'])
        if (user_account == None):
            return Response({
                "Err": "User account not found"
            },
                status=status.HTTP_404_NOT_FOUND)
        
        personObject = Account.objects.filter(
            first_name=request.headers['first_name'],
            last_name=request.header['last_name'],
            email=request.headers['email'],
        )[0]
        person = AccountSerializer(personObject).data
        person['followers'] = getFollow(personObject, "FOLLOWERS")
        if request.data['token'] != None:
            try:
                Followers.objects.get(
                    account=user_account,
                    following_user=personObject,
                )
                person['is_following'] = True
            except Followers.DoesNotExist:
                person['is_following'] = False

        person['written_articles'] = len(
            Article.objects.all().filter(reporter_account=personObject))

        return Response(person)
