from rest_framework import viewsets
from .serializers import *
from .models import *
from rest_framework.response import Response
import datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.views import View
from django.views.generic.edit  import CreateView
from rest_framework.views import APIView

#Fixed in ALlARticles
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().filter(isPrivate = False)
    serializer_class = ArticleSerializer

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class AllArticles(APIView):
    def get(self, request, *args, **kwargs):
        querysetSend = {}
        queryset = Article.objects.all().filter(isPrivate = False)
        for article in queryset:
            tmpArt = ArticleSerializer(article)
            account = Account.objects.all().filter(id=tmpArt.data['reporter_account'])
            querysetSend[tmpArt.data['id']] = tmpArt.data
            querysetSend[tmpArt.data['id']]['reporter_account'] = account[0].first_name + " " + account[0].last_name

        # print(querysetSend)     
        return Response(querysetSend)

    def post(self, request, *args, **kwargs):
        pass

#Useless can remove
class AccountCreation(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        token = Token.objects.get(key=request.data['token'])
        currentUser = User.objects.all().filter(id=token.user_id)[0]
        print(currentUser , "-------------------------------------------------------------------------")
        account = Account.objects.create(
            user=currentUser,
            first_name=request.data['first_name'],
            last_name=request.data['last_name'],
            email=request.data['email'],
        )
        account.save()
        print(account)
        return Response(request.data)

    def get(self, request, *args, **kwargs):
        pass

class EditAccount(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        token = Token.objects.get(key=request.data['token'])
        currentUser = User.objects.all().filter(id=token.user_id)[0]
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

class CreateNewArticle(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        token = Token.objects.get(key=request.data['token'])
        account = User.objects.all().filter(id=token.user_id)[0].account
        # print(request.data)
        Article.objects.create(
            headline=request.data['headline'],
            reporter_account=account,
            rating=0,
            isPrivate = False,
            visibility = request.data['visibility'],
            article_description=request.data['article_description'],
            article_body=request.data['article_body'],
            tags=None,
        )
        return Response(request.data)

    def get(self, request, *args, **kwargs):
        pass

class current_user(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        token = Token.objects.get(key=request.data['token'])
        try:
            account = User.objects.all().filter(id=token.user_id)[0].account
            popularArticles = PopularUserArticles(account)
            data = {
                'first_name' : account.first_name,
                'last_name' : account.last_name,
                'creation_date' : account.creation_date,
                'role' : account.role,
                'phone' : account.phone,
                'bio': account.bio,
                'email': account.email,
                'occupation': account.occupation,
                'popular_articles': popularArticles,
            }
            return Response(data)
        except:
            return Response(request.data)

    def get(self, request):
        pass


class AllUserArticles(ObtainAuthToken):
        def post(self, request, *args, **kwargs):
            token = Token.objects.get(key=request.data['token'])
            account = User.objects.all().filter(id=token.user_id)[0].account
            queryset = Article.objects.all().filter(reporter_account=account)
            # serializer_class = ArticleSerializer(data[0])
            AllArticles = {}
            for article in queryset:
                data = ArticleSerializer(article)
                AllArticles[data.data['id']] = data.data

            # print(AllArticles)
            return Response(AllArticles)
        
        def get(self, request, *args, **kwargs):
            pass


def PopularUserArticles(account):
    queryset = Article.objects.all().filter(reporter_account=account).order_by('rating').reverse()[:4]
    #FIX THIS -> Throws error when there are no articles to get. Might not be this but the ACCOUNT detail is never inputed
    #Add fields to forum
    #Fixed I think?
    popular_articles = {}
    for article in queryset:
        convertedArticle = ArticleSerializer(article)
        popular_articles[convertedArticle.data['id']] = convertedArticle.data
    # print(popular_articles)
    return(popular_articles)

class ArticleID(APIView):
    def post(self, request, *args, **kwargs):
        pass

    def get(self, request, *args, **kwargs):
        pass