from rest_framework import viewsets
from ..serializers import *
from ..models import *
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from ..APIUtility import *
from rest_framework import status


class AllArticles(APIView):
    def post(self, request, *args, **kwargs):
        pass
        # querysetSend = {}
        # # queryset= []

        # # if request.data['tags'] != [None]:
        # #     queryset = Article.objects.all().filter(isPrivate = False)
        # #     for article in queryset:
        # #         tags = {}
        # #         for tag in article.tags:
        # #             tags[tag] = tag
        # #     print(tags)

        #         # print(article.tags[0])
        #         # if article.tags[0] == request.data['tags'][0]:
        #         #     print(len(request.data['tags']))
        #         #create new dict/map
        #         #store all article tags from that article 
        #         #run contains to check if the article has those tags
        #         #if the do return new set
        #         #else return nothing

        # # else:
        # queryset = Article.objects.all().filter(isPrivate = False)
        # for article in queryset:
        #     articleJson = ArticleSerializer(article)
        #     key = articleJson.data['key']
        #     querysetSend[key] = articleJson.data
        #     reporter_account = Account.objects.all().filter(id=articleJson.data['reporter_account'])[0]
        #     querysetSend[key]['reporter_account'] = AccountSerializer(reporter_account).data
        #     querysetSend[key]['reporter_account']['followers'] = getFollow(reporter_account, "FOLLOWERS")
        #     if request.data['token'] != None:
        #         try:
        #             BookmarkedArticles.objects.get(
        #                 account = getCurrentUser(request.data['token'], "isBookmarked"),
        #                 saved=article,
        #             )
        #             querysetSend[key]['isBookmarked'] = True
        #         except BookmarkedArticles.DoesNotExist:
        #             querysetSend[key]['isBookmarked'] = False
                
        #         try:
        #             Followers.objects.get(
        #                 account = getCurrentUser(request.data['token'], "isFollowing"),
        #                 following_user=reporter_account
        #             )
        #             querysetSend[key]['reporter_account']['is_following'] = True
        #         except Followers.DoesNotExist:
        #             querysetSend[key]['reporter_account']['is_following'] = False

        # popqueryset = {}
        # popQuerySetRequest = Article.objects.all().filter(isPrivate = False).order_by('rating').reverse()[:5] #Change num to display num of pop articles

        # for article in popQuerySetRequest:
        #     articleJson = ArticleSerializer(article)
        #     key = articleJson.data['key']
        #     popqueryset[key] = articleJson.data
        #     reporter_account = Account.objects.all().filter(id=articleJson.data['reporter_account'])[0]
        #     popqueryset[key]['reporter_account'] = AccountSerializer(reporter_account).data
        #     popqueryset[key]['reporter_account']['followers'] = getFollow(reporter_account, "FOLLOWERS")

        #     if request.data['token'] != None:
        #         try:
        #             isFollowing= Followers.objects.get(
        #                 account = getCurrentUser(request.data['token'], "isFollowing"),
        #                 following_user=reporter_account
        #             )
        #             popqueryset[key]['reporter_account']['is_following'] = True
        #         except Followers.DoesNotExist:
        #             popqueryset[key]['reporter_account']['is_following'] = False  

        # return Response({'allArticles': querysetSend,'popArticles': popqueryset})

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
        if(bool(request.data['tags'])):
            tags = request.data['tags'].split(',')
            tags.pop()
            tags = {tag: tag for tag in tags}
            queryset = Article.objects.filter(isPrivate = False, tags__in=[tags])
        else:
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

            user_account = get_user_account(request.headers['token'])
            if (user_account == None):
                return Response({
                        "Err": "User account not found"
                    },
                    status=status.HTTP_404_NOT_FOUND
                )
        
            try:
                BookmarkedArticles.objects.get(
                    account=user_account,
                    saved=article,
                )
                querysetSend[key]['isBookmarked'] = True
            except BookmarkedArticles.DoesNotExist:
                querysetSend[key]['isBookmarked'] = False
            
            try:
                Followers.objects.get(
                    account = user_account,
                    following_user=reporter_account
                )
                querysetSend[key]['reporter_account']['is_following'] = True
            except Followers.DoesNotExist:
                querysetSend[key]['reporter_account']['is_following'] = False

        popqueryset = {}
        popQuerySetRequest = get_popular_articles(token, 5)

        return Response({'articles': querysetSend,'popArticles': popQuerySetRequest}, status=status.HTTP_200_OK)

class AllUserArticles(ObtainAuthToken):
        def get(self, request, *args, **kwargs):
            user_account = get_user_account(request.headers['token'])
            if (user_account == None):
                return Response({
                        "Err": "User account not found"
                    },
                    status=status.HTTP_404_NOT_FOUND
                )
            queryset = Article.objects.all().filter(reporter_account=user_account)
            
            AllArticles = {}
            for article in queryset:
                article_json = ArticleSerializer(article)
                AllArticles[article_json.data['id']] = article_json.data
                AllArticles[article_json.data['id']]['reporter_account'] = attachNameToArticle(article_json)

            return Response(AllArticles, status=status.HTTP_200_OK)

class GetUserArticles(APIView):
    def get(self, request, *args, **kwargs):
        if request.data['key'] == None:
            return Response({
                "Message": "No valid key",
            },
            status=status.HTTP_400_BAD_REQUEST)
        key = request.data['key']
        userArticles = Article.objects.all().filter(
            reporter_account = Account.objects.all().get(key=key)
        )[:6]
        queryset={}
        for article in userArticles:
            articlesJson = ArticleSerializer(article).data
            queryset[articlesJson['key']] = articlesJson
        
        return Response(queryset, status=status.HTTP_200_OK)

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

        return Response(querysetRequest, status=status.HTTP_200_OK)

class CreateNewArticle(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        user_account = get_user_account(request.headers['token'])
        if (user_account == None):
            return Response({
                    "Err": "User account not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        article = Article.objects.create(
            key= ArticleKeyGen(),
            headline=request.data['headline'],
            reporter_account=user_account,
            rating=0,
            isPrivate = False,
            visibility = request.data['visibility'],
            article_description=request.data['article_description'],
            article_body=request.data['article_body'],
            tags=None,
        )
        article.save()
        return Response({
                "Message" : "Article successfully created!"
            }, 
            status=status.HTTP_201_CREATED
        )

class UpdateArticle(ObtainAuthToken):
    def put(self, request, *args, **kwargs):
        user_account = get_user_account(request.headers['token'])
        if (user_account == None):
            return Response({
                    "Err": "User account not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        
        Article.objects.filter(reporter_account=user_account, key=request.data['key']).update(
            headline= request.data['headline'],
            article_description= request.data['article_description'],
            article_body= request.data['article_body'],
            visibility= request.data['visibility'],
            isPrivate= request.data['isPrivate'],
        )
        return Response({
            "Message" : "Article successfully update!"
        },
            status=status.HTTP_200_OK
        )

class DeleteArticle(APIView):
    def delete(self, request, *args, **kwargs):
        user_account = get_user_account(request.headers['token'])
        if (user_account == None):
            return Response({
                    "Err": "User account not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        article = Article.objects.all().filter(reportter_account=user_account, key=request.data['key']).delete()
        return Response(request.data, status=status.HTTP_204_NO_CONTENT)

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

        data = sorted(data, key=data.get)[::-1]
        data = {tag: tag for tag in data}
        return Response(data, status=status.HTTP_200_OK)


class HandleBookmark(ObtainAuthToken):
        def put(self, request, *args, **kwargs):
            user_account = get_user_account(request.headers['token'])
            if (user_account == None):
                return Response({
                        "Err": "User account not found"
                    },
                    status=status.HTTP_404_NOT_FOUND
                )
            if(request.data['type'] == "BOOKMARK_ARTICLE"):
                try:
                    BookmarkedArticles.objects.get(
                        account = user_account,
                        saved = Article.objects.get(key=request.data['key'])
                    )
                    return Response({
                        "Err": "Article already bookmarked"
                    },
                        status=status.HTTP_400_BAD_REQUEST
                    )
                except BookmarkedArticles.DoesNotExist:
                    bookmark = BookmarkedArticles.objects.create(
                        account = user_account,
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
                    return Response({
                        "Err": "Article not bookmarked"
                    },
                        status=status.HTTP_400_BAD_REQUEST
                    )
            return Response({
                "Message": "Updated BookMark",
            },
                status=status.HTTP_200_OK
            )

class MyBookmarkedArticles(ObtainAuthToken):
    def get(self, request, *args, **kwargs):
        user_account = get_user_account(request.headers['token'])
        if (user_account == None):
            return Response({
                    "Err": "User account not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        bookmarked = BookmarkedArticles.objects.all().filter(
            account=user_account,
        )
        queryset = {}
        for entry in bookmarked:
            queryset[ArticleSerializer(entry.saved).data['key']] = ArticleSerializer(entry.saved).data

        return Response(queryset, status=status.HTTP_200_OK)


#Really not needed I think...
class SavedArticles(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        user_account = get_user_account(request.headers['token'])
        if (user_account == None):
            return Response({
                    "Err": "User account not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )
            
        saved = BookmarkedArticles.objects.all().filter(account=user_account)
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