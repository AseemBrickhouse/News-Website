from rest_framework import status
from ..serializers import *
from ..models import *
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from ..APIUtility import *


class GetComments(APIView):
    def get(self, request, *args, **kwargs):
        key = request.GET.get('article_key')
        article = Article.objects.get(key=key)
        queryset_parent = Comment.objects.filter(commented_article=article, parent=None)
        data = {}

        def get_nested_comments(children):
            if not children:
                return {}
            children_json = {}
            for child in children:
                child_json = CommentSerializer(child).data
                person = Account.objects.get(id=child_json['commenter_account'])
                child_json['commenter_account'] = AccountSerializer(person).data
                child_json['children'] = get_nested_comments(child.children)
                children_json[child_json['id']] = child_json

            return children_json

        for comment in queryset_parent:
            comment_json = CommentSerializer(comment).data
            comment_json['children'] = get_nested_comments(comment.children)
            person = Account.objects.get(id=comment_json['commenter_account'])
            comment_json['commenter_account'] = AccountSerializer(person).data
            data[comment_json['id']] = comment_json

        return Response(data, status=status.HTTP_200_OK)
    
class CreateComment(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        print(request.data, 'here')
        token = request.headers.get('token')
        user_account = get_user_account(token)

        if not user_account:
            return Response({"Err": "User account not found"},status=status.HTTP_404_NOT_FOUND)
        
        article_key = request.data.get('article_key')
        queryset = Article.objects.get(key=article_key)
        parent_id = request.data.get('parent')
        parent_query = Comment.objects.get(id=parent_id) if parent_id else None

        comment = Comment.objects.create(
            commenter_account = user_account,
            commented_article = queryset,
            content = request.data['content'],
            parent = parent_query,
        )
        print(comment)
        return Response(status=status.HTTP_201_CREATED)

class DeleteComment(ObtainAuthToken):
    def delete(self, request, *args, **kwargs):
        token = request.headers.get('token')
        user_account = get_user_account(token)
    
        if not user_account:
            return Response({"Err": "User account not found"},status=status.HTTP_404_NOT_FOUND)
        
        query_article = Article.objects.get(key=request.data.get('article_key'))
        comment_id = request.data.get('comment_id')

        try:
            query = Comment.objects.get(
                id = comment_id,
                commenter_account = user_account,
                commented_article = query_article,
            )
            query.delete()
            return Response(status=status.HTTP_200_OK)
        except Comment.DoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)


class UpdateComment(ObtainAuthToken):
     def put(self, request, *args, **kwargs):
        token = request.headers.get('token')
        user_account = get_user_account(token)

        if not user_account:
            return Response({"Err": "User account not found"},status=status.HTTP_404_NOT_FOUND)
        
        query_article = Article.objects.get(key=request.data.get('article_key'))
        comment_id = request.data.get('comment_id')
        
        try:
            query = Comment.objects.filter(
                id=comment_id,
                commenter_account=user_account,
                commented_article=query_article,
            )
            query.update(
                content = request.data.get('content'),
                is_edited = True,
            )
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class UpdateRating(ObtainAuthToken):
     def put(self, request, *args, **kwargs):
        token = request.headers.get('token')
        user_account = get_user_account(token)

        if not user_account:
            return Response({"Err": "User account not found"},status=status.HTTP_404_NOT_FOUND)
        
        query_article = Article.objects.get(key=request.data.get('article_key'))
        comment_id = request.data.get('comment_id')
        try:
            query_comment = Comment.objects.filter(
                id=comment_id,
                commented_article=query_article,
            )
            query_comment.update(
                rating = request.data.get('rating'),
            )
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        

class GetUserComments(APIView):
    def get(self, request, *args, **kwargs):
        person_first = request.data.get('first_name')
        person_last = request.data.get('last_name')
        account_query = Account.objects.filter(first_name=person_first, last_name=person_last)
        article_query = Article.objects.get(key=request.data.get('article_key'))

        data = {}

        for person in account_query:
            comments = {}
            person_json = AccountSerializer(person).data
            query = Comment.objects.filter(commenter_account=person, commenter_article=article_query)

            for comment in query:
                comment_json = CommentSerializer(comment).data
                comments[comment_json['id']] = comment_json

                if comment_json['parent'] != None:
                    parent = Comment.objects.get(id=comment.parent)
                    parent_json = CommentSerializer(parent).data
                    comments[comment_json['id']]['parent'] = parent_json

            data[person_json['key']]['comments'] = comments

        return Response(data, status=status.HTTP_200_OK)

class GetChildComments(APIView):
    def get(self, request, *args, **kwargs):
        children = {}
        article_key = request.data.get('article_key')
        article = Article.objects.get(key=article_key)
        query = Comment.objects.filter(commented_article=article, parent=request.data.get('comment_id'))

        for comment in query:
            comment_json = CommentSerializer(comment).data
            commenter_account = comment.commenter_account
            comment_json['commenter_account'] = AccountSerializer(commenter_account).data
            children[comment_json['id']] = comment_json

        return Response(children, status=status.HTTP_200_OK)
    
class GetParentComments(APIView):
    def get(self, request, *args, **kwargs):
        comments = {}
        article_key = request.data.get('article_key')
        article = Article.objects.get(key=article_key)
        query = Comment.objects.filter(commented_article=article)
        for comment in query:
            comment_json = CommentSerializer(comment).data
            commenter_account = comment.commenter_account
            comment_json['commenter_account'] = AccountSerializer(commenter_account).data
            comments[comment_json['id']] = comment_json
        return Response(comments, status=status.HTTP_200_OK)