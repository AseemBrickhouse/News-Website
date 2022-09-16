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