from typing import Any
from ..serializers import *
from ..models import *
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from ..APIUtility import *
from rest_framework import status

class ArticleView(ObtainAuthToken):
    def get(self, request, *args, **kwargs):
        token = request.META.get('HTTP_TOKEN')
        user_account = get_user_account(token)
        if 'article_id' in kwargs:
            article_id = kwargs['article_id']
            try:
                article = Article.objects.get(key=article_id)
            except Article.DoesNotExist:
                return Response({"error": "Article not found", "id": article_id}, status=status.HTTP_404_NOT_FOUND)
            
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
        token = request.META.get('HTTP_TOKEN')
        user_account = get_user_account(token)

        if user_account:
            article = Article.objects.create(
                key=ArticleKeyGen(),
                headline=request.data['headline'],
                reporter_account=user_account,
                rating=0,
                isPrivate=False,
                visibility=request.data['visibility'],
                article_description=request.data['article_description'],
                article_body=request.data['article_body'],
                tags=None,
            )
            article.save()
            return Response({"message": "Article successfully created! ", "id" : article.key},status=status.HTTP_201_CREATED)
        return Response({"error": "User account not found"},status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        token = request.META.get('HTTP_TOKEN')
        user_account = get_user_account(token)
        article_id = kwargs['article_id']

        if user_account:
            try:
                article = Article.objects.get(reporter_account=user_account, key=article_id)
                article.headline = request.data['headline']
                article.article_description=request.data['article_description']
                article.article_body=request.data['article_body']
                article.visibility=request.data['visibility']
                article.isPrivate= request.data['isPrivate']
                article.save()
                return Response({'message': 'Article successfully updated'}, status=status.HTTP_200_OK)
            except Article.DoesNotExist:
                return Response({"error": "Article does not exists"},status=status.HTTP_404_NOT_FOUND)

        return Response({"error": "User account not found"},status=status.HTTP_404_NOT_FOUND)


    def delete(self, request, *args, **kwargs):
        token = request.META.get('HTTP_TOKEN')
        user_account = get_user_account(token)

        if user_account:
            try:
                article = Article.objects.get(reporter_account=user_account,key=kwargs['article_id'])
                article.delete()
                return Response({'message': "Article successfully deleted"}, status=status.HTTP_204_NO_CONTENT)
            except Article.DoesNotExist:
                return Response({'message': "You are not the author of the article"})
            
class BookmarkArticleView(ObtainAuthToken):
    def get(self, request, *args, **kwargs):
        bookmark_id = kwargs['bookmark_id']

        query = BookmarkedArticles.objects.get(id=bookmark_id)
        bookmark_data = BookmarkedArticlesSerializer(query).data
        bookmark_data['account'] = AccountSerializer(Account.objects.get(id=bookmark_data['account'])).data
        bookmark_data['saved'] = ArticleSerializer(Article.objects.get(id=bookmark_data['saved'])).data

        return Response(bookmark_data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        token = request.META.get('HTTP_TOKEN')
        user_account = get_user_account(token)
        article_id = kwargs['article_id']
        article = Article.objects.get(key=article_id)
        if user_account:
            try:
                BookmarkedArticles.objects.get(account=user_account,saved=article)
                return Response({"error": "Article already bookmarked"}, status=status.HTTP_409_CONFLICT)
            except BookmarkedArticles.DoesNotExist:
                article_to_bookmark = BookmarkedArticles.objects.create(account=user_account, saved=article)
                article_to_bookmark.save()
                return Response({"message": "Article successfully bookmarked", "id": article_to_bookmark.id}, status=status.HTTP_201_CREATED)
            
        return Response({"error": "User account not found"},status=status.HTTP_404_NOT_FOUND)


    def delete(self, request, *args, **kwargs):
        token = request.META.get('HTTP_TOKEN')
        user_account = get_user_account(token)
        article_id = kwargs['article_id']
        article = Article.objects.get(key=article_id)

        if user_account:
            try:
                BookmarkedArticles.objects.get(account=user_account, saved=article).delete()
                return Response({"message": "Removed article bookmark"}, status=status.HTTP_204_NO_CONTENT)
            except BookmarkedArticles.DoesNotExist:
                return Response({"error": "Article bookmark not found"},status=status.HTTP_404_NOT_FOUND)
            
        return Response({"error": "User account not found"},status=status.HTTP_404_NOT_FOUND)


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
                
                child_json['comment_vote'] = {}
                if user_account:
                    queryset_comment_vote = CommentVote.objects.filter(account=user_account, comment=child)
                    if queryset_comment_vote:
                        comment_vote_json = CommentVoteSerializer(queryset_comment_vote[0]).data
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
                queryset_comment_vote = CommentVote.objects.filter(account=user_account, comment=comment)
                if queryset_comment_vote:
                    comment_vote_json = CommentVoteSerializer(queryset_comment_vote[0]).data
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
            parent_query = Comment.objects.get(id=parent_id) if parent_id else None

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

        article_id = kwargs['article_id']
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
            return Response({"message:", " Comment successfully updated."},status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist:
            return Response({"error:" ,"Comment not found."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        pass