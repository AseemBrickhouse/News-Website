from rest_framework import viewsets
from ..serializers import *
from ..models import *
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from ..APIUtility import *

class AllArticles(APIView):
    def get(self, request, *args, **kwargs):
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

        popqueryset = {}
        popQuerySetRequest = Article.objects.all().filter(isPrivate = False).order_by('rating').reverse()[:3]

        for article in popQuerySetRequest:
            articleJson = ArticleSerializer(article)
            popqueryset[articleJson.data['id']] = articleJson.data
            popqueryset[articleJson.data['id']]['reporter_account'] = attachNameToArticle(articleJson)
        # print(querysetSend)     
        return Response({
                            'allArticles': querysetSend, 
                            'popArticles': popqueryset
                        })

    def post(self, request, *args, **kwargs):
        pass

class AllUserArticles(ObtainAuthToken):
        def post(self, request, *args, **kwargs):
            # account = getCurrentUser(request.data['token'], "USERARTICLES")
            queryset = Article.objects.all().filter(reporter_account=getCurrentUser(request.data['token'], "USERARTICLES"))
            
            AllArticles = {}
            for article in queryset:
                data = ArticleSerializer(article)
                AllArticles[data.data['id']] = data.data
                AllArticles[data.data['id']]['reporter_account'] = attachNameToArticle(data)

            return Response(AllArticles)
        
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

class CreateNewArticle(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        account = getCurrentUser(request.data['token'], "CREATEARTICLE")
        # print(request.data)
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
                key= ArticleKeyGen(),
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
            # print(article)
            return Response(responseCreated)

    def get(self, request, *args, **kwargs):
        pass

class DeleteArticle(APIView):
    def post(self, request, *args, **kwargs):
        article = Article.objects.all().filter(key=request.data['key']).delete()
        return Response(request.data)

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