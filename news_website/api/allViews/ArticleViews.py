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
            articleJson = ArticleSerializer(article)
            key = articleJson.data['key']
            querysetSend[key] = articleJson.data
            reporter_account = Account.objects.all().filter(id=articleJson.data['reporter_account'])[0]
            querysetSend[key]['reporter_account'] = AccountSerializer(reporter_account).data
            querysetSend[key]['reporter_account']['followers'] = getFollow(reporter_account, "FOLLOWERS")
            if request.data['token'] != None:
                try:
                    isBookmarked = BookmarkedArticles.objects.get(
                        account = getCurrentUser(request.data['token'], "isBookmarked"),
                        saved=article,
                    )
                    querysetSend[key]['isBookmarked'] = True
                except BookmarkedArticles.DoesNotExist:
                    querysetSend[key]['isBookmarked'] = False
                
                try:
                    isFollowing= Followers.objects.get(
                        account = getCurrentUser(request.data['token'], "isFollowing"),
                        following_user=reporter_account
                    )
                    querysetSend[key]['reporter_account']['is_following'] = True
                except Followers.DoesNotExist:
                    querysetSend[key]['reporter_account']['is_following'] = False

        popqueryset = {}
        popQuerySetRequest = Article.objects.all().filter(isPrivate = False).order_by('rating').reverse()[:3] #Change num to display num of pop articles

        for article in popQuerySetRequest:
            articleJson = ArticleSerializer(article)
            key = articleJson.data['key']
            popqueryset[key] = articleJson.data
            reporter_account = Account.objects.all().filter(id=articleJson.data['reporter_account'])[0]
            popqueryset[key]['reporter_account'] = AccountSerializer(reporter_account).data
            popqueryset[key]['reporter_account']['followers'] = getFollow(reporter_account, "FOLLOWERS")

            if request.data['token'] != None:
                try:
                    isFollowing= Followers.objects.get(
                        account = getCurrentUser(request.data['token'], "isFollowing"),
                        following_user=reporter_account
                    )
                    popqueryset[key]['reporter_account']['is_following'] = True
                except Followers.DoesNotExist:
                    popqueryset[key]['reporter_account']['is_following'] = False  

        return Response({'allArticles': querysetSend,'popArticles': popqueryset})

    def get(self, request, *args, **kwargs):
        pass

class AllUserArticles(ObtainAuthToken):
        def post(self, request, *args, **kwargs):
            queryset = Article.objects.all().filter(reporter_account=getCurrentUser(request.data['token'], "USERARTICLES"))
            
            AllArticles = {}
            for article in queryset:
                data = ArticleSerializer(article)
                AllArticles[data.data['id']] = data.data
                AllArticles[data.data['id']]['reporter_account'] = attachNameToArticle(data)

            return Response(AllArticles)
        
        def get(self, request, *args, **kwargs):
            pass

class GetUserArticles(APIView):
    def post(self, request, *args, **kwargs):
        if request.data['key'] == None:
            return Response({
                "Message": "No valid key",
            })
        key = request.data['key']
        userArticles = Article.objects.all().filter(
            reporter_account = Account.objects.all().get(key=key)
        )[:6]
        # print(userArticles)
        queryset={}
        for article in userArticles:
            articlesJson = ArticleSerializer(article).data
            queryset[articlesJson['key']] = articlesJson
        
        return Response(queryset)

class PopularArticles(APIView):
    def get(self, request, *args, **kwargs):
        querysetRequest = {}
        queryset = Article.objects.all().filter(isPrivate = False).order_by('rating').reverse()[:3]

        for article in queryset:
            articleJson = ArticleSerializer(article)
            querysetRequest[articleJson.data['id']] = articleJson.data
            querysetRequest[articleJson.data['id']]['reporter_account']={
                'name': attachNameToArticle(articleJson),
                'key': Account.objects.all().filter(id=articleJson.data['reporter_account'])[0].key
            }

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

class Bookmark(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        if request.data['token'] == None:
            return Response({
                "Error" : "No current toke. (Try loggin in or Creating an account! )"
            })
        try:
            bookmark = BookmarkedArticles.objects.get(
                account = getCurrentUser(request.data['token'], "BOOKMARKARTICLE"),
                saved = Article.objects.get(key=request.data['key'])
            )
            return Response({
                "Message" : "Bookmark already exist"
            })
        except BookmarkedArticles.DoesNotExist:
            bookmark = BookmarkedArticles.objects.create(
                account = getCurrentUser(request.data['token'], "BOOKMARKARTICLE"),
                saved = Article.objects.get(key=request.data['key'])
            )
            bookmark.save()
            return Response({
                'Message': "Succesfully Bookmarked",
                'account': AccountSerializer(getCurrentUser(request.data['token'], "BOOKMARKARTICLE")).data,
                'article': ArticleSerializer(Article.objects.get(key=request.data['key'])).data
            })

class RemoveBookmark(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        if request.data['token'] == None:
            return Response({
                "Error" : "No current toke. (Try loggin in or Creating an account! )"
            })
        try:
            isBookmarked = BookmarkedArticles.objects.get(
                account=getCurrentUser(request.data['token'], "REMOVEBOOKMARK"),
                saved=Article.objects.get(key=request.data['key'])
            ).delete()
            return Response({
                'Message': "Successfully removed",
            })
        except BookmarkedArticles.DoesNotExist:
            return Response({
                'Error': 'Article not Bookmarked!',
            })
    
class MyBookmarkedArticles(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        bookmarked = BookmarkedArticles.objects.all().filter(
            account= getCurrentUser(request.data['token'], "GETBOOKMARKEDARTICLES"),
        )
        print(bookmarked)
        queryset = {}
        for entry in bookmarked:
            queryset[ArticleSerializer(entry.saved).data['key']] = ArticleSerializer(entry.saved).data
        
        print(queryset)

        return Response(queryset)

class SavedArticles(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        #Handle error i.e noToken
        if request.data['token'] == None:
            return Response({
                'Message': "Not logged in"
            })
        else:
            account = getCurrentUser(request.data['token'], "SAVEDARTICLES")
            saved = BookmarkedArticles.objects.all().filter(account=account)
            queryset = {}
            for entry in saved:
                articleInfo = ArticleSerializer(entry.saved).data
                queryset[articleInfo['key']] = articleInfo
            if queryset != {}:
                return Response(queryset)
            else:
                return Response({
                    "Message": "You have no saved articles"
                })
            # return Response(queryset) if queryset != None else return Response({ "Message": "you have no saved articles"})
            # return Response(queryset)