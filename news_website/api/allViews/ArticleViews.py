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
                    BookmarkedArticles.objects.get(
                        account = getCurrentUser(request.data['token'], "isBookmarked"),
                        saved=article,
                    )
                    querysetSend[key]['isBookmarked'] = True
                except BookmarkedArticles.DoesNotExist:
                    querysetSend[key]['isBookmarked'] = False
                
                try:
                    Followers.objects.get(
                        account = getCurrentUser(request.data['token'], "isFollowing"),
                        following_user=reporter_account
                    )
                    querysetSend[key]['reporter_account']['is_following'] = True
                except Followers.DoesNotExist:
                    querysetSend[key]['reporter_account']['is_following'] = False

        popqueryset = {}
        popQuerySetRequest = Article.objects.all().filter(isPrivate = False).order_by('rating').reverse()[:5] #Change num to display num of pop articles

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
        def get_popular_articles(token, display_count):
            popQuerySetRequest = Article.objects.all().filter(isPrivate = False).order_by('rating').reverse()[:display_count]

            for article in popQuerySetRequest:
                articleJson = ArticleSerializer(article)
                key = articleJson.data['key']
                popqueryset[key] = articleJson.data
                reporter_account = Account.objects.all().filter(id=articleJson.data['reporter_account'])[0]
                popqueryset[key]['reporter_account'] = AccountSerializer(reporter_account).data
                popqueryset[key]['reporter_account']['followers'] = getFollow(reporter_account, "FOLLOWERS")
                if not "null".__eq__(token):
                    try:
                       Followers.objects.get(
                            account = getCurrentUser( token, "isFollowing"),
                            following_user=reporter_account
                       )
                       popqueryset[key]['reporter_account']['is_following'] = True
                    except Followers.DoesNotExist:
                       popqueryset[key]['reporter_account']['is_following'] = False  
            return popqueryset
        
        querysetSend = {}
        queryset = Article.objects.all().filter(isPrivate = False)

        for article in queryset:
            articleJson = ArticleSerializer(article)
            key = articleJson.data['key']
            querysetSend[key] = articleJson.data
            reporter_account = Account.objects.all().filter(id=articleJson.data['reporter_account'])[0]
            querysetSend[key]['reporter_account'] = AccountSerializer(reporter_account).data
            querysetSend[key]['reporter_account']['followers'] = getFollow(reporter_account, "FOLLOWERS")
            token = request.headers['token']
        #Fix

            if not "null".__eq__(token):
                try:
                    BookmarkedArticles.objects.get(
                        account = getCurrentUser(token, "isBookmarked"),
                        saved=article,
                    )
                    querysetSend[key]['isBookmarked'] = True
                except BookmarkedArticles.DoesNotExist:
                    querysetSend[key]['isBookmarked'] = False
                
                try:
                    Followers.objects.get(
                        account = getCurrentUser(token, "isFollowing"),
                        following_user=reporter_account
                    )
                    querysetSend[key]['reporter_account']['is_following'] = True
                except Followers.DoesNotExist:
                    querysetSend[key]['reporter_account']['is_following'] = False

        popqueryset = {}
        popQuerySetRequest = get_popular_articles(token, 5)

        return Response({'allArticles': querysetSend,'popArticles': popQuerySetRequest})

class AllUserArticles(ObtainAuthToken):
        def get(self, request, *args, **kwargs):
            token = Token.objects.get(key=request.headers['token'])
            if token == None:
                return Response({
                    "Error" : "No current token. (Try loggin in or Creating an account! )"
                })
            user_account = User.objects.all().filter(id=token.user_id)[0].account
            queryset = Article.objects.all().filter(reporter_account=user_account)
            
            AllArticles = {}
            for article in queryset:
                article_json = ArticleSerializer(article)
                AllArticles[article_json.data['id']] = article_json.data
                AllArticles[article_json.data['id']]['reporter_account'] = attachNameToArticle(article_json)

            return Response(AllArticles)

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
    def delete(self, request, *args, **kwargs):
        article = Article.objects.all().filter(key=request.data['key']).delete()
        #Handel if the article was deleted or not
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

class HandleBookmark(ObtainAuthToken):
        def put(self, request, *args, **kwargs):
            token = Token.objects.get(key=request.headers['token'])
            if token == None:
                return Response({
                    "Error" : "No current token. (Try loggin in or Creating an account! )"
                })
            user_account = User.objects.all().filter(id=token.user_id)[0].account
            if(request.data['type'] == "BOOKMARK_ARTICLE"):
                try:
                    BookmarkedArticles.objects.get(
                        account = user_account,
                        saved = Article.objects.get(key=request.data['key'])
                    )
                except BookmarkedArticles.DoesNotExist:
                    bookmark = BookmarkedArticles.objects.create(
                        account = getCurrentUser(token, "BOOKMARKARTICLE"),
                        saved = Article.objects.get(key=request.data['key'])
                    )
                    bookmark.save()
            if(request.data['type'] == "REMOVE_BOOKMARK"):
                try:
                    BookmarkedArticles.objects.get(
                        account=user_account,
                        saved=Article.objects.get(key=request.data['key'])
                    ).delete()
                except BookmarkedArticles.DoesNotExist:
                    pass
            return Response({
                "Message": "Updated BookMark",
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