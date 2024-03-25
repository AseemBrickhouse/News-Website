from rest_framework import status
from ..serializers import *
from ..models import *
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from ..APIUtility import *


class HasAccount(ObtainAuthToken):
    def get(self, request, *args, **kwargs):
        print(request.headers['token'])
        user_account = get_user_account(request.headers['token'])
        if (user_account == None):
            return Response({
                "Error": "User account not found"
            },status=status.HTTP_404_NOT_FOUND)
        return Response({
            "Success": "User account found"
        }, status=status.HTTP_200_OK)


class current_user(ObtainAuthToken):
    def get(self, request, *args, **kwargs):
        user_account = get_user_account(request.headers['token'])
        if (user_account == None):
            return Response({
                "Err": "User account not found"
            },
                status=status.HTTP_404_NOT_FOUND)

        user_data = AccountSerializer(user_account).data
        print(user_data['profile_pic'])
        user_data['profile_pic'] = user_data['profile_pic'] if user_data['profile_pic'] != None else "/images/defaultProfilePic.png",
        user_data['popular_articles'] = PopularUserArticles(user_account)
        user_data['written_articles'] = len(
            Article.objects.all().filter(reporter_account=user_account))
        user_data['followers'] = getFollow(user_account, "FOLLOWERS")
        user_data['following'] = getFollow(user_account, "FOLLOWING")

        return Response(user_data)


class AllAccounts(ObtainAuthToken):
    def get(self, request, *args, **kwargs):
        user_account = get_user_account(request.headers['token'])
        queryset = {}
        for account in Account.objects.all().exclude(key=user_account.key):
            queryset[AccountSerializer(
                account).data['user']] = AccountSerializer(account).data
            queryset[AccountSerializer(account).data['user']]['key'] = AccountSerializer(
                account).data['key']
            queryset[AccountSerializer(account).data['user']]['written_articles'] = len(
                Article.objects.all().filter(reporter_account=account))
            queryset[AccountSerializer(account).data['user']]['followers'] = getFollow(
                account, "FOLLOWERS")
            try:
                Followers.objects.get(
                    account=user_account,
                    following_user=account,
                )
                queryset[AccountSerializer(
                    account).data['user']]['is_following'] = True
            except Followers.DoesNotExist:
                queryset[AccountSerializer(
                    account).data['user']]['is_following'] = False

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
                profile_pic="/images/defaultProfilePic.png"
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

        personObject = Account.objects.filter(
            first_name=request.headers['firstName'],
            last_name=request.headers['lastName'],
            email=request.headers['email'],
        )[0]
        person = AccountSerializer(personObject).data
        person['followers'] = getFollow(personObject, "FOLLOWERS")
        if user_account != None:
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



class AccountView(ObtainAuthToken):
    def get_single_user(self, user_account: Account, account_id: str) -> dict:
        try:
            account_query = Account.objects.get(key=account_id)
            account_data = AccountSerializer(account_query).data
            account_data['followers'] = count_followers_or_following(account_query, "FOLLOWERS")
            if user_account:
                try:
                    Followers.objects.get(account=user_account, following_user=account_query)
                    account_data['is_following'] = True
                except Followers.DoesNotExist:
                    account_data['is_following'] = False
            account_data['written_articles'] = len(Article.objects.all().filter(reporter_account=account_query))
            # print(account_data)
            return {account_data['key']: account_data}
        except Account.DoesNotExist:
            error = {
                "error": "Account does not exists",
                "status": status.HTTP_404_NOT_FOUND,
            }
            return error

    def get_all_users(self, user_account: Account) -> dict:
        account_query = Account.objects.all().exclude(key=user_account.key)
        queryset = {}
        for account in account_query:
            account_data = AccountSerializer(account).data
            account_data['written_articles'] = len(Article.objects.all().filter(reporter_account=account))
            account_data['followers'] = getFollow(account, "FOLLOWERS")
            try:
                Followers.objects.get(account=user_account,following_user=account,)
                account_data['is_following'] = True
            except Followers.DoesNotExist:
                account_data['is_following'] = False

            queryset[account_data['key']] = account_data
        return queryset

    #Need to refactor

    def get(self, request, *args, **kwargs):
        token = request.headers.get('token')
        user_account = get_user_account(token)
    
        #if we get an account_id then return that person otherwise return everyone(need to CHUNK it)
        try:
            account_id = kwargs['account_id']
            account = self.get_single_user(user_account, account_id)
            if 'error' in account:
                return Response(account['error'], account['status'])
            return Response(account, status=status.HTTP_200_OK)
        except KeyError:
            return Response(self.get_all_users(user_account), status=status.HTTP_200_OK)


    def post(self, request, *args, **kwargs):
        token = token = request.headers.get('token')
        token_obj = Token.objects.get(key=token)

        if token_obj == None:
            return Response({
                "error": "Token not found"
            },
                status=status.HTTP_404_NOT_FOUND)

        current_user_object = User.objects.get(id=token.user_id)
        try:
            account = Account.objects.get(
                email=request.data['email'],
            )
            return Response({
                "error": "Email already in user",
            },
                status=status.HTTP_400_BAD_REQUEST)

        except Account.DoesNotExist:
            account = Account.objects.create(
                user=current_user_object,
                key=AccountKeyGen(3),
                first_name=request.data['first_name'],
                last_name=request.data['last_name'],
                email=request.data['email'],
                profile_pic="/images/defaultProfilePic.png"
            )
            account.save()
            return Response(AccountSerializer(account).data, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        token = request.headers.get('token')
        user_account = get_user_account(token)
        try:
            account_query = Account.objects.get(account=user_account)
            account_query.delete()
            return Response({"error": "Account successfully deleted"}, status=status.HTTP_204_NO_CONTENT)
        except Account.DoesNotExist:
            return Response({"error": "Account does not exists"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        token = request.headers.get('token')
        user_account = get_user_account(token)
        if user_account == None:
            return Response({
                "error": "User account not found"
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
            status=status.HTTP_202_ACCEPTED,
        )
