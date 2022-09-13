from rest_framework import viewsets
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from .APIUtility import *

#Fixed in ALlARticles
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().filter(isPrivate = False).order_by('rating')
    serializer_class = ArticleSerializer

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class AllAccounts(APIView):
    def get(self, request, *args, **kwargs):
        queryset = {}
        for account in Account.objects.all():
            queryset[AccountSerializer(account).data['user']] = AccountSerializer(account).data
            queryset[AccountSerializer(account).data['user']]['written_articles'] = len(Article.objects.all().filter(reporter_account=account))
            # queryset.append(setQuerySetData('user', AccountSerializer(account)))
        print(queryset)
        return Response(queryset)

    def post(self, request, *args, **kwargs):
        pass


class AllArticles(APIView):
    def post(self, request, *args, **kwargs):
        querysetSend = {}
        # queryset= []

        # if request.data['tags'] != [None]:
        #     queryset = Article.objects.all().filter(isPrivate = False)
        #     for article in queryset:
        #         tags = {}
        #         for tag in article.tags:
        #             tags[tag] = tag
        #     print(tags)

                # print(article.tags[0])
                # if article.tags[0] == request.data['tags'][0]:
                #     print(len(request.data['tags']))
                #create new dict/map
                #store all article tags from that article 
                #run contains to check if the article has those tags
                #if the do return new set
                #else return nothing

        # else:
        queryset = Article.objects.all().filter(isPrivate = False)

        for article in queryset:
            tmpArt = ArticleSerializer(article)
            # attachNameToArticle(tmpArt)
            # account = Account.objects.all().filter(id=tmpArt.data['reporter_account'])
            querysetSend[tmpArt.data['id']] = tmpArt.data
            querysetSend[tmpArt.data['id']]['reporter_account'] = attachNameToArticle(tmpArt)

        print(querysetSend)     
        return Response(querysetSend)

    def get(self, request, *args, **kwargs):
        pass

class PopularArticles(APIView):
    def get(self, request, *args, **kwargs):
        querysetRequest = {}
        queryset = Article.objects.all().filter(isPrivate = False).order_by('rating').reverse()[:3]

        for article in queryset:
            articleJson = ArticleSerializer(article)
            querysetRequest[articleJson.data['id']] = articleJson.data
            querysetRequest[articleJson.data['id']]['reporter_account'] = attachNameToArticle(articleJson)

        return Response(querysetRequest)

    def post(self, request, *args, **kwargs):
        pass


class AccountCreation(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        currentUser = getCurrentUser(request.data['token'], "CREATEACCOUNT")
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

class CreateNewArticle(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        account = getCurrentUser(request.data['token'], "CREATEARTICLE")
        print(request.data)
        if request.data['key'] != '-1':
            Article.objects.all().filter(key=request.data['key']).update(
                headline= request.data['headline'],
                article_description= request.data['article_description'],
                article_body= request.data['article_body'],
                visibility= request.data['visibility'],
                isPrivate= request.data['isPrivate'],
            )
            responseUpdated = {
                "message" : "Article successfully update!"
            }
            return Response(responseUpdated)
        else:
            article = Article.objects.create(
                key= keyGen(),
                headline=request.data['headline'],
                reporter_account=account,
                rating=0,
                isPrivate = False,
                visibility = request.data['visibility'],
                article_description=request.data['article_description'],
                article_body=request.data['article_body'],
                tags=None,
            )
            article.save()
            responseCreated = {
                "message" : "Article successfully update!"
            }
            print(article)
            return Response(responseCreated)

    def get(self, request, *args, **kwargs):
        pass

class DeleteArticle(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data['key'])
        article = Article.objects.all().filter(key=request.data['key']).delete()
        # articleJson = ArticleSerializer(article).data
        print(article)
        return Response(request.data)
        # article = Article.objects.all().filter(key=request.data['key'])
        # articleJson = ArticleSerializer(article).data
        # print(articleJson)
        # return Response(articleJson)


class current_user(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        account = getCurrentUser(request.data['token'], "CURRENTACCOUNT")
        print(account)
        try:
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
                'written_articles': len(Article.objects.all().filter(reporter_account=account))
            }
            return Response(data)
        except:
            return Response(request.data)

    def get(self, request):
        pass


class AllUserArticles(ObtainAuthToken):
        def post(self, request, *args, **kwargs):
            account = getCurrentUser(request.data['token'], "USERARTICLES")
            queryset = Article.objects.all().filter(reporter_account=account)
            AllArticles = {}
            for article in queryset:
                data = ArticleSerializer(article)
                AllArticles[data.data['id']] = data.data

            print(AllArticles   )
            return Response(AllArticles)
        
        def get(self, request, *args, **kwargs):
            pass

class PopularTags(APIView):
    def get(self, request, *args, **kwargs):
        data = {}
        queryset = Article.objects.all()

        for article in queryset:
            for tag in article.tags:
                if tag in data:
                    data[tag] = data[tag]+1
                else: 
                    data[tag] = 1

        print(data)
        sorted_keys = sorted(data, key=data.get)  
        print(sorted_keys)
        #format result and send back 
        return Response(request.data)
    def post(self, request, *args, **kwargs):
        pass


def PopularUserArticles(account):
    queryset = Article.objects.all().filter(reporter_account=account).order_by('rating').reverse()[:2]
    popular_articles = {}
    for article in queryset:
        convertedArticle = ArticleSerializer(article)
        popular_articles[convertedArticle.data['id']] = convertedArticle.data
    return(popular_articles)

class ArticleID(APIView):
    def post(self, request, *args, **kwargs):
        pass

    def get(self, request, *args, **kwargs):
        pass

