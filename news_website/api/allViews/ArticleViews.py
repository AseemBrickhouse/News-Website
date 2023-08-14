from collections import defaultdict
from rest_framework import viewsets
from ..serializers import *
from ..models import *
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from ..APIUtility import *
from rest_framework import status


class AllArticles(APIView):
    def get(self, request, *args, **kwargs):        
        def get_popular_articles(user_account, display_count):
            popQuerySetRequest = Article.objects.all().filter(isPrivate = False).order_by('rating').reverse()[:display_count]
            popqueryset = {}
            for article in popQuerySetRequest:
                articleJson = ArticleSerializer(article).data
                key = articleJson['key']
                reporter_account = Account.objects.all().filter(id=articleJson['reporter_account'])[0]
                articleJson['reporter_account'] = AccountSerializer(reporter_account).data
                articleJson['reporter_account']['followers'] = getFollow(reporter_account, "FOLLOWERS")
                if user_account != None:
                    try:
                        Followers.objects.get(
                            account = user_account,
                            following_user=reporter_account
                    )
                        articleJson['reporter_account']['is_following'] = True
                    except Followers.DoesNotExist:
                        articleJson['reporter_account']['is_following'] = False
                    try:
                        BookmarkedArticles.objects.get(
                            account=user_account,
                            saved=article,
                        )
                        articleJson['isBookmarked'] = True
                    except BookmarkedArticles.DoesNotExist:
                        articleJson['isBookmarked'] = False
                    try:
                        Followers.objects.get(
                            account = user_account,
                            following_user=reporter_account
                        )
                        articleJson['reporter_account']['is_following'] = True
                    except Followers.DoesNotExist:
                        articleJson['reporter_account']['is_following'] = False  

                popqueryset[key] = articleJson

            return popqueryset
        
        querysetSend = {}

        # print(request.headers['tags'])
        user_account = get_user_account(request.headers['token'])
        if(bool(request.headers['tags'])):
            tags = request.headers['tags'].split(',')
            tags.pop()
            tags = {tag: tag for tag in tags}
            queryset = Article.objects.filter(isPrivate = False, tags__in=[tags])
        else:
            queryset = Article.objects.all().filter(isPrivate = False)

        # print(queryset)
        for article in queryset:
            articleJson = ArticleSerializer(article)
            key = articleJson.data['key']
            querysetSend[key] = articleJson.data
            reporter_account = Account.objects.all().filter(id=articleJson.data['reporter_account'])[0]
            querysetSend[key]['reporter_account'] = AccountSerializer(reporter_account).data
            querysetSend[key]['reporter_account']['followers'] = getFollow(reporter_account, "FOLLOWERS")

            if user_account != None: 
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

        popQuerySetRequest = get_popular_articles(user_account, 5)

        return Response({'articles': querysetSend,'popArticles': popQuerySetRequest}, status=status.HTTP_200_OK)

class GetArticle(ObtainAuthToken):
    def get(self, request, *args, **kwargs):
        user_account = get_user_account(request.headers['token'])
        article = Article.objects.get(key=request.headers['key'])

        articleJson = ArticleSerializer(article).data
        reporter_account = Account.objects.get(id=articleJson['reporter_account'])
        articleJson['reporter_account'] = reporter_account.data

        if user_account != None:
            try:
                BookmarkedArticles.objects.get(
                    account=user_account,
                    saved=article,
                )
                articleJson['isBookmarked'] = True
            except BookmarkedArticles.DoesNotExist:
                articleJson['isBookmarked'] = False
            try:
                Followers.objects.get(
                    account = user_account,
                    following_user=reporter_account
                )
                articleJson['reporter_account']['is_following'] = True
            except Followers.DoesNotExist:
                articleJson['reporter_account']['is_following'] = False
        else:
            articleJson['isBookmarked'] = False

        return Response(articleJson, status=status.HTTP_200_OK)      

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
        if request.headers['key'] == None:
            return Response({
                "Message": "No valid key",
            },
            status=status.HTTP_400_BAD_REQUEST)
        user_account = get_user_account(request.headers['token'])
        key = request.headers['key']
        reporter_account = Account.objects.all().get(key=key)
        userArticles = Article.objects.all().filter(
            reporter_account = reporter_account
        )[:6]
        queryset={}
        for article in userArticles:
            articlesJson = ArticleSerializer(article).data
            articlesJson['reporter_account'] = AccountSerializer(reporter_account).data
            articlesJson['reporter_account']['followers'] = getFollow(reporter_account, "FOLLOWERS")
            if user_account != None:
                try:
                    BookmarkedArticles.objects.get(
                        account=user_account,
                        saved=article,
                    )
                    articlesJson['reporter_account']['isBookmarked'] = True
                except BookmarkedArticles.DoesNotExist:
                    articlesJson['reporter_account']['isBookmarked'] = False
                try:
                    Followers.objects.get(
                        account = user_account,
                        following_user=reporter_account
                    )
                    articlesJson['reporter_account']['is_following'] = True
                except Followers.DoesNotExist:
                    articlesJson['reporter_account']['is_following'] = False
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
        user_account = get_user_account(request.data.get('token'))
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
        article = Article.objects.all().filter(reporter_account=user_account, key=request.data['key']).delete()
        return Response(request.data, status=status.HTTP_204_NO_CONTENT)

# class PopularTags(APIView):
#     def get(self, request, *args, **kwargs):
#         data = {}
#         queryset = Article.objects.all()

#         for article in queryset:
#             for tag in article.tags:
#                 if tag in data:
#                     data[tag] = data[tag]+1
#                 else: 
#                     data[tag] = 1

#         data = sorted(data, key=data.get)[::-1]
#         data = {tag: tag for tag in data}
#         return Response(data, status=status.HTTP_200_OK)
class PopularTags(APIView):
    def get(self, request, *args, **kwargs):
        data = defaultdict(int)
        queryset = Article.objects.all()

        for article in queryset:
            for tag in article.tags:
                data[tag] += 1

        sorted_data = sorted(data, key=data.get, reverse=True)
        data = {tag: tag for tag in sorted_data}
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
            article = Article.objects.get(key=request.data['key'])
            if(request.data['type'] == "BOOKMARK_ARTICLE"):
                try:
                    BookmarkedArticles.objects.get(
                        account = user_account,
                        saved = article
                    )
                    return Response({
                        "Err": "Article already bookmarked"
                    },
                        status=status.HTTP_400_BAD_REQUEST
                    )
                except BookmarkedArticles.DoesNotExist:
                    bookmark = BookmarkedArticles.objects.create(
                        account = user_account,
                        saved = article
                    )
                    bookmark.save()
            if(request.data['type'] == "REMOVE_BOOKMARK"):
                try:
                    BookmarkedArticles.objects.get(
                        account=user_account,
                        saved=article
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
    def get(self, request, *args, **kwargs):
        user_account = get_user_account(request.headers['token'])
        if (user_account == None):
            return Response({
                    "Err": "User account not found"
                },
                # status=status.HTTP_404_NOT_FOUND
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