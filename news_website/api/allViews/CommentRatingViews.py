from ..serializers import *
from ..models import *
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from ..APIUtility import *
from rest_framework import status
from rest_framework.views import APIView


class CommentRatingView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        token = request.headers.get('token')
        user_account = get_user_account(token)

        article_id = kwargs['article_id']
        comment_id = kwargs['comment_id']

        if not user_account:
            return Response({"error": "User account not found"}, status=status.HTTP_404_NOT_FOUND)

        query_article = Article.objects.get(key=article_id)
        query_comment = Comment.objects.get(
            id=comment_id, commented_article=query_article)

        try:
            CommentVote.objects.get(
                account=user_account, comment=query_comment, has_vote=True)
            return Response({"error": "Vote already exists"}, status=status.HTTP_302_FOUND)

        except CommentVote.DoesNotExist:
            create_comment_vote = CommentVote.objects.create(
                account=user_account,
                comment=query_comment,
                has_vote=True,
                vote_type='upvote' if request.data.get(
                    'type') == 'upvote' else 'downvote'
            )
            create_comment_vote.save()
            query_comment.rating = request.data.get(
                'rating')+1 if request.data.get('type') == 'upvote' else request.data.get('rating') - 1
            query_comment.save()
            comment_vote_data = CommentVoteSerializer(create_comment_vote).data
        return Response(comment_vote_data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        token = request.headers.get('token')
        user_account = get_user_account(token)

        article_id = kwargs['article_id']
        comment_id = kwargs['comment_id']
        comment_vote_id = kwargs['rating_id']

        if not user_account:
            return Response({"error": "User account not found"}, status=status.HTTP_404_NOT_FOUND)

        query_article = Article.objects.get(key=article_id)
        query_comment = Comment.objects.get(
            id=comment_id, commented_article=query_article)

        comment_vote_query = CommentVote.objects.get(
            id=comment_vote_id, account=user_account, comment=query_comment)

        if type != request.data.get('type') == 'upvote':
            query_comment.rating = request.data.get('rating') + 2
        else:
            query_comment.rating = request.data.get('rating') - 2

        comment_vote_query.vote_type = request.data.get('type')

        query_comment.save()
        comment_vote_query.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, *args, **kwargs):
        token = request.headers.get('token')
        user_account = get_user_account(token)

        article_id = kwargs['article_id']
        comment_id = kwargs['comment_id']
        comment_vote_id = kwargs['rating_id']

        if not user_account:
            return Response({"error": "User account not found"}, status=status.HTTP_404_NOT_FOUND)

        query_article = Article.objects.get(key=article_id)
        query_comment = Comment.objects.get(
            id=comment_id, commented_article=query_article)
        comment_vote_query = CommentVote.objects.get(
            id=comment_vote_id, account=user_account, comment=query_comment)

        if comment_vote_query.vote_type == request.data.get('type') == 'upvote':
            query_comment.rating = request.data.get('rating') - 1
        else:
            query_comment.rating = request.data.get('rating') + 1

        query_comment.save()
        comment_vote_query.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
