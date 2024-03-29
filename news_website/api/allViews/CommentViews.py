from rest_framework import status
from ..serializers import *
from ..models import *
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from ..APIUtility import *

class UpdateRating(ObtainAuthToken):
    def put(self, request, *args, **kwargs):
        token = request.headers.get('token')
        print(token)
        user_account = get_user_account(token)
        
        if not user_account:
            return Response({"Err": "User account not found"}, status=status.HTTP_404_NOT_FOUND)

        query_article = Article.objects.get(
            key=request.data.get('article_key'))
        comment_id = request.data.get('comment_id')

        try:
            query_comment = Comment.objects.filter(
                id=comment_id,
                commented_article=query_article,
            )
            print(query_comment)
            comment_vote_query = CommentVote.objects.filter(
                account=user_account, comment=query_comment[0])
            print(comment_vote_query)
            if not comment_vote_query:
                new_comment_vote = CommentVote.objects.create(
                    account=user_account,
                    comment=query_comment[0],
                    has_vote=True,
                    vote_type='upvote' if request.data.get(
                        'type') == 'upvote' else 'downvote'
                )
                new_comment_vote.save()
                query_comment.update(rating=request.data.get(
                    'rating')+1 if request.data.get('type') == 'upvote' else request.data.get('rating') - 1)
            else:
                # if comment_vote_query.has_vote():
                type = comment_vote_query[0].vote_type
                if type != request.data.get('type') == 'upvote':
                    query_comment.update(rating=request.data.get('rating') + 1)
                    comment_vote_query.update(
                        vote_type=request.data.get('type'))
                elif type == request.data.get('type') == 'upvote':
                    query_comment.update(rating=request.data.get('rating') - 1)
                    comment_vote_query.delete()
                elif type != request.data.get('type') == 'downvote':
                    query_comment.update(rating=request.data.get('rating') - 1)
                    comment_vote_query.update(
                        vote_type=request.data.get('type'))
                elif type == request.data.get('type') == 'downvote':
                    query_comment.update(rating=request.data.get('rating') + 1)
                    comment_vote_query.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


#Update this to take if we get an article_id in or not
class GetUserComments(APIView):
    def get(self, request, *args, **kwargs):
        person_first = request.data.get('first_name')
        person_last = request.data.get('last_name')
        account_query = Account.objects.filter(
            first_name=person_first, last_name=person_last)
        article_query = Article.objects.get(
            key=request.data.get('article_key'))

        data = {}

        for person in account_query:
            comments = {}
            person_json = AccountSerializer(person).data
            query = Comment.objects.filter(
                commenter_account=person, commenter_article=article_query)

            for comment in query:
                comment_json = CommentSerializer(comment).data
                comments[comment_json['id']] = comment_json

                if comment_json['parent'] != None:
                    parent = Comment.objects.get(id=comment.parent)
                    parent_json = CommentSerializer(parent).data
                    comments[comment_json['id']]['parent'] = parent_json

            data[person_json['key']]['comments'] = comments

        return Response(data, status=status.HTTP_200_OK)


class ChildComments(APIView):
    def get(self, request, *args, **kwargs):
        children = {}
        article_key = request.data.get('article_key')
        article = Article.objects.get(key=article_key)
        query = Comment.objects.filter(
            commented_article=article, parent=request.data.get('comment_id'))

        for comment in query:
            comment_json = CommentSerializer(comment).data
            commenter_account = comment.commenter_account
            comment_json['commenter_account'] = AccountSerializer(
                commenter_account).data
            children[comment_json['id']] = comment_json

        return Response(children, status=status.HTTP_200_OK)


class ParentComments(APIView):
    def get(self, request, *args, **kwargs):
        comments = {}
        article_key = request.data.get('article_key')
        article = Article.objects.get(key=article_key)
        query = Comment.objects.filter(commented_article=article)
        for comment in query:
            comment_json = CommentSerializer(comment).data
            commenter_account = comment.commenter_account
            comment_json['commenter_account'] = AccountSerializer(
                commenter_account).data
            comments[comment_json['id']] = comment_json
        return Response(comments, status=status.HTTP_200_OK)


#General Comment View
class CommentView(ObtainAuthToken):
    def get(self, request, *args, **kwargs):
        token = request.META.get('HTTP_TOKEN')
        user_account = None
        if not token:
            pass
        else:
            user_account = get_user_account(token)

        article_id = kwargs['article_id']
        article = Article.objects.get(key=article_id)
        queryset_parent = Comment.objects.filter(
            commented_article=article, parent=None)
        data = {}

        def get_nested_comments(children):
            if not children:
                return {}
            children_json = {}
            for child in children:
                child_json = CommentSerializer(child).data
                person = Account.objects.get(
                    id=child_json['commenter_account'])
                child_json['commenter_account'] = AccountSerializer(
                    person).data

                child_json['comment_vote'] = {}
                if user_account:
                    queryset_comment_vote = CommentVote.objects.filter(
                        account=user_account, comment=child)
                    if queryset_comment_vote:
                        comment_vote_json = CommentVoteSerializer(
                            queryset_comment_vote[0]).data
                        child_json['comment_vote'] = comment_vote_json
                    else:
                        child_json['comment_vote'] = {}

                child_json['children'] = get_nested_comments(child.children)

                children_json[child_json['id']] = child_json

            return children_json

        for comment in queryset_parent:
            comment_json = CommentSerializer(comment).data
            comment_json['children'] = get_nested_comments(comment.children)
            person = Account.objects.get(id=comment_json['commenter_account'])
            comment_json['commenter_account'] = AccountSerializer(person).data
            comment_json['comment_vote'] = {}
            if user_account:
                queryset_comment_vote = CommentVote.objects.filter(
                    account=user_account, comment=comment)
                if queryset_comment_vote:
                    comment_vote_json = CommentVoteSerializer(
                        queryset_comment_vote[0]).data
                    comment_json["comment_vote"] = comment_vote_json
            data[comment_json['id']] = comment_json

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        token = request.META.get('HTTP_TOKEN')
        article_id = kwargs['article_id']

        parent_id = request.data.get('parent_id')
        content = request.data.get('content')

        user_account = get_user_account(token)

        if not user_account:
            return Response({"error": "User account not found"}, status=status.HTTP_404_NOT_FOUND)
        try:
            queryset = Article.objects.get(key=article_id)
            parent_query = Comment.objects.get(
                id=parent_id) if parent_id else None

            comment = Comment.objects.create(
                commenter_account=user_account,
                commented_article=queryset,
                content=content,
                parent=parent_query,
            )
            comment.save()
            return Response(status=status.HTTP_201_CREATED)
        except Article.DoesNotExist:
            return Response({"error": "Article not found"}, status=status.HTTP_404_NOT_FOUND)
        except Comment.DoesNotExist:
            return Response({"error": "Parent comment not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        token = request.META.get('HTTP_TOKEN')
        user_account = get_user_account(token)

        print(token, user_account)
        if not user_account:
            return Response({"error": "User account not found"}, status=status.HTTP_404_NOT_FOUND)

        article_id = kwargs['article_key']
        query_article = Article.objects.get(key=article_id)
        comment_id = kwargs['comment_id']

        try:
            query = Comment.objects.filter(
                id=comment_id,
                commenter_account=user_account,
                commented_article=query_article,
            )
            query.update(
                content=request.data.get('content'),
                is_edited=True,
            )
            return Response({"message:", " Comment successfully updated."}, status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist:
            return Response({"error:", "Comment not found."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        print('here')
        token = request.META.get('HTTP_TOKEN')
        user_account = get_user_account(token)
        article_id = kwargs['article_id']
        comment_id = kwargs['comment_id']

        if not user_account:
            return Response({"error": "User account not found"}, status=status.HTTP_404_NOT_FOUND)

        query_article = Article.objects.get(key=article_id)

        try:
            query = Comment.objects.get(
                id=comment_id,
                commenter_account=user_account,
                commented_article=query_article,
            )
            query.delete()
            return Response(status=status.HTTP_200_OK)
        except Comment.DoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)