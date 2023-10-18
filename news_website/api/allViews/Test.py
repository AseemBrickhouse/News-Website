from collections import defaultdict
from typing import Any
from rest_framework import viewsets
from ..serializers import *
from ..models import *
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from ..APIUtility import *
from rest_framework import status

class ArticleView(ObtainAuthToken):
    def get(self, request, *args, **kwargs):
        article_id = request.GET.get('article_id')
        token = request.META.get('HTTP_TOKEN')
        user_account = get_user_account(token)
        if article_id:
            try:
                article = Article.objects.get(key=article_id)
            except Article.DoesNotExist:
                return Response({"error": "Article not found"}, status=status.HTTP_404_NOT_FOUND)
            
            article_data = ArticleSerializer(article).data
            reporter_account = Account.objects.get(id= article_data['reporter_account'])
            article_data['reporter_account'] = AccountSerializer(reporter_account).data

            if user_account:
                try:
                    BookmarkedArticles.objects.get(account=user_account, saved=article)
                    article_data['isBookmarked'] = True
                except BookmarkedArticles.DoesNotExist:
                    article_data['isBookmarked'] = False

                try:
                    Followers.objects.get(account=user_account,following_user=reporter_account)
                    article_data['reporter_account']['is_following'] = True
                except Followers.DoesNotExist:
                    article_data['reporter_account']['is_following'] = False

            else:
                article_data['isBookmarked'] = False

            article_data['reporter_account']['followers'] = getFollow(reporter_account, "FOLLOWERS")

            return Response(article_data, status=status.HTTP_200_OK)
        

        tags = request.META.get('HTTP_TAGS')
        if (tags):
            tags = tags.split(',')
            tag_query = Article.objects.filter(isPrivate=False, tags__in=[tags])
            #TODO: implement searching by tag
        else:
            article_queryset = Article.objects.all().filter(isPrivate=False)

        # print(queryset)
        article_list = {}
        for article in article_queryset:
            article_data = ArticleSerializer(article)
            key = article_data.data['key']
            article_list[key] = article_data.data
            reporter_account = Account.objects.get(id=article_data.data['reporter_account'])
            article_list[key]['reporter_account'] = AccountSerializer(reporter_account).data
            article_list[key]['reporter_account']['followers'] = getFollow(reporter_account, "FOLLOWERS")

            if user_account:
                try:
                    BookmarkedArticles.objects.get(account=user_account,saved=article,)
                    article_list[key]['isBookmarked'] = True
                except BookmarkedArticles.DoesNotExist:
                    article_list[key]['isBookmarked'] = False

                try:
                    Followers.objects.get(account=user_account,following_user=reporter_account)
                    article_list[key]['reporter_account']['is_following'] = True
                except Followers.DoesNotExist:
                    article_list[key]['reporter_account']['is_following'] = False
            else:
                article_list[key]['isBookmarked'] = False
                article_list[key]['reporter_account']['is_following'] = False


        popular_articles_query = Article.objects.all().filter(isPrivate=False).order_by('rating').reverse()[:5]
        popular_articles = {}

        for article in popular_articles_query:
            article_data = ArticleSerializer(article).data
            reporter_account = Account.objects.get(id=article_data['reporter_account'])
            article_data['reporter_account'] = AccountSerializer(reporter_account).data
            article_data['reporter_account']['followers'] = getFollow(reporter_account, "FOLLOWERS")

            if user_account:
                try:
                    Followers.objects.get(account=user_account, following_user=reporter_account)
                    article_data['reporter_account']['is_following'] = True
                except Followers.DoesNotExist:
                    article_data['reporter_account']['is_following'] = False

                try:
                    BookmarkedArticles.objects.get(account=user_account, saved=article)
                    article_data['isBookmarked'] = True
                except BookmarkedArticles.DoesNotExist:
                    article_data['isBookmarked'] = False

            key = article_data['key']
            popular_articles[key] = article_data

        return Response({'articles': article_list, 'popArticles': popular_articles}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        pass

    def put(self, request, *args, **kwargs):
        pass

    def delete(self, request, *args, **kwargs):
        pass