from ..serializers import *
from ..models import *
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from ..APIUtility import *
from rest_framework import status
from rest_framework.views import APIView

# Rating needs to be a number from 0 - 100
# I guess how its set up now we have to split the obj(upvote) and the obj(downvote)
# To get the actual rating of the article
class ArticleRatingView(ObtainAuthToken, APIView):

    UPVOTE = 'upvote'
    DOWNVOTE = 'downvote'
    NEUTRAL = 'neutral'
    # used for calculating new percentage on article

    def find_new_total(self, query_article_rating):
        # When we create/update/delete calc. the new total 0-100 for the given article
        upvote_query = len(ArticleRating.objects.filter(
            article=query_article_rating, vote_type=ArticleRatingView.UPVOTE))
        downvote_query = len(ArticleRating.objects.filter(
            article=query_article_rating, vote_type=ArticleRatingView.DOWNVOTE))
        total_votes = upvote_query + downvote_query
        if total_votes == 0:
            return 0
        return (upvote_query / total_votes) * 100.0

    def get(self, request, *args, **kwargs):
        token = request.META.get('HTTP_TOKEN')
        user_account = get_user_account(token)
        article_id = kwargs['article_id']
        query_article = Article.objects.get(key=article_id)
        article_rating_data = {
            'upvote_count': len(ArticleRating.objects.filter(
                article=query_article, vote_type=ArticleRatingView.UPVOTE)),
            'downvote_count': len(ArticleRating.objects.filter(
                article=query_article, vote_type=ArticleRatingView.DOWNVOTE)),
            'current_article_rating_vote': False
        }

        try:
            ArticleRating.objects.get(article=query_article, account=user_account)
            #Doesn't throw an error so it exists in DB  
            article_rating_data['current_article_rating_vote'] = True
        except ArticleRating.DoesNotExist:
            pass

        return Response(article_rating_data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        token = request.META.get('HTTP_TOKEN')
        user_account = get_user_account(token)

        article_id = kwargs['article_id']

        if not user_account:
            return Response({"error": "User account not found"}, status=status.HTTP_404_NOT_FOUND)

        query_article = Article.objects.get(key=article_id)

        try:
            ArticleRating.objects.get(
                account=user_account, article=query_article)
            return Response({"error": "Vote already exists"}, status=status.HTTP_302_FOUND)
        except ArticleRating.DoesNotExist:
            rating = ArticleRating.objects.create(
                account=user_account,
                article=query_article,
                has_vote=True,
                vote_type=ArticleRatingView.UPVOTE if request.data.get(
                    'type') == ArticleRatingView.UPVOTE else ArticleRatingView.DOWNVOTE
            )
            rating.save()

            query_article.rating = self.find_new_total(query_article)
            query_article.save()
            rating_data = ArticleRatingSerializer(rating).data

            return Response(rating_data, status=status.HTTP_201_CREATED)


    def put(self, request, *args, **kwargs):
        token = request.META.get('HTTP_TOKEN')
        user_account = get_user_account(token)

        article_id = kwargs['article_id']

        if not user_account:
            return Response({"error": "User account not found"}, status=status.HTTP_404_NOT_FOUND)

        if not article_id:
            return Response({"error": "Article ID not provided"}, status=status.HTTP_400_BAD_REQUEST)

        query_article = Article.objects.get(key=article_id)
        try:
            query_article_rating = ArticleRating.objects.get(
                account=user_account, article=query_article)
        except ArticleRating.DoesNotExist:
            error = {
                "error": "User article rating not found.",
                "account-key": user_account.key,
                "article-key": query_article.key,
            }
            return Response(error, status=status.HTTP_400_BAD_REQUEST)
        
        if query_article_rating.vote_type == ArticleRatingView.NEUTRAL:
            query_article_rating.vote_type = request.data.get('type')
        elif query_article_rating.vote_type == request.data.get('type') == ArticleRatingView.UPVOTE:
            query_article_rating.vote_type = ArticleRatingView.NEUTRAL
        elif query_article_rating.vote_type == request.data.get('type') == ArticleRatingView.DOWNVOTE:
            query_article_rating.vote_type = ArticleRatingView.NEUTRAL
        else:
            query_article_rating.vote_type = request.data.get('type')

        query_article_rating.save()
        query_article.rating = self.find_new_total(query_article)
        query_article.save()

        data = ArticleRatingSerializer(query_article_rating).data
        data['account-key'] = user_account.key
        data['article-key'] = query_article.key

        return Response(data,status=status.HTTP_204_NO_CONTENT)


    #Not sure if its better to delete if it exists or just update if theres an entry
    def delete(self, request, *args, **kwargs):
        token = request.META.get('HTTP_TOKEN')
        user_account = get_user_account(token)

        if not user_account:
            return Response({"error": "User account not found"}, status=status.HTTP_404_NOT_FOUND)
        
        article_id = kwargs['article_id']
        
        if not article_id:
            return Response({"error": "Article ID not provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        query_article = Article.objects.get(key=article_id)

        try:
            query_article_rating = ArticleRating.objects.get(
                account=user_account, article=query_article)
        except ArticleRating.DoesNotExist:
            error = {
                "error": "User article rating not found.",
                "account-key": user_account.key,
                "article-key": query_article.key,
            }
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        deleted_article_rating = ArticleRatingSerializer(query_article_rating).data
        query_article_rating.delete()
        query_article.rating = self.find_new_total(query_article)
        query_article.save()

        deleted_article_rating['account-key'] = user_account.key
        deleted_article_rating['article-key'] = query_article.key

        return Response(deleted_article_rating, status=status.HTTP_202_ACCEPTED)