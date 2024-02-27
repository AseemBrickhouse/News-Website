from typing import Any
from ..serializers import *
from ..models import *
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from ..APIUtility import *
from rest_framework import status
from rest_framework.views import APIView
from django.http import JsonResponse

#New Form of writing the api endpoints


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
            reporter_account = Account.objects.get(
                id=article_data['reporter_account'])
            article_data['reporter_account'] = AccountSerializer(
                reporter_account).data

            if user_account:
                try:
                    BookmarkedArticles.objects.get(
                        account=user_account, saved=article)
                    article_data['isBookmarked'] = True
                except BookmarkedArticles.DoesNotExist:
                    article_data['isBookmarked'] = False

                try:
                    Followers.objects.get(
                        account=user_account, following_user=reporter_account)
                    article_data['reporter_account']['is_following'] = True
                except Followers.DoesNotExist:
                    article_data['reporter_account']['is_following'] = False

            else:
                article_data['isBookmarked'] = False

            article_data['reporter_account']['followers'] = getFollow(
                reporter_account, "FOLLOWERS")

            return Response(article_data, status=status.HTTP_200_OK)

        tags = request.META.get('HTTP_TAGS')
        print(tags)
        if tags != 'undefined':
            tags = tags.split(',')
            tag_query = Article.objects.filter(
                isPrivate=False, tags__in=[tags])
            # TODO: implement searching by tag
        else:
            article_queryset = Article.objects.all().filter(isPrivate=False)

        article_list = {}
        for article in article_queryset:
            article_data = ArticleSerializer(article)
            key = article_data.data['key']
            article_list[key] = article_data.data
            reporter_account = Account.objects.get(
                id=article_data.data['reporter_account'])
            article_list[key]['reporter_account'] = AccountSerializer(
                reporter_account).data
            article_list[key]['reporter_account']['followers'] = getFollow(
                reporter_account, "FOLLOWERS")

            if user_account:
                try:
                    BookmarkedArticles.objects.get(
                        account=user_account, saved=article,)
                    article_list[key]['isBookmarked'] = True
                except BookmarkedArticles.DoesNotExist:
                    article_list[key]['isBookmarked'] = False

                try:
                    Followers.objects.get(
                        account=user_account, following_user=reporter_account)
                    article_list[key]['reporter_account']['is_following'] = True
                except Followers.DoesNotExist:
                    article_list[key]['reporter_account']['is_following'] = False
            else:
                article_list[key]['isBookmarked'] = False
                article_list[key]['reporter_account']['is_following'] = False

        popular_articles_query = Article.objects.all().filter(
            isPrivate=False).order_by('rating').reverse()[:5]
        popular_articles = {}

        for article in popular_articles_query:
            article_data = ArticleSerializer(article).data
            reporter_account = Account.objects.get(
                id=article_data['reporter_account'])
            article_data['reporter_account'] = AccountSerializer(
                reporter_account).data
            article_data['reporter_account']['followers'] = getFollow(
                reporter_account, "FOLLOWERS")

            if user_account:
                try:
                    Followers.objects.get(
                        account=user_account, following_user=reporter_account)
                    article_data['reporter_account']['is_following'] = True
                except Followers.DoesNotExist:
                    article_data['reporter_account']['is_following'] = False

                try:
                    BookmarkedArticles.objects.get(
                        account=user_account, saved=article)
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
                isPrivate=request.data['isPrivate'],
                visibility=request.data['visibility'],
                article_description=request.data['article_description'],
                article_body=request.data['article_body'],
                tags=request.data.get('tags'),
            )
            article.save()
            return Response({"message": "Article successfully created! ", "id": article.key}, status=status.HTTP_201_CREATED)
        return Response({"error": "User account not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        token = request.META.get('HTTP_TOKEN')
        user_account = get_user_account(token)
        article_id = kwargs['article_id']
        if user_account:
            try:
                article = Article.objects.get(reporter_account=user_account, key=article_id)
                article.headline = request.data['headline']
                article.article_description = request.data['article_description']
                article.article_body = request.data['article_body']
                article.visibility = request.data['visibility']
                article.isPrivate = request.data['isPrivate']
                article.tags = request.data['tags']
                article.save()
                return Response({'message': 'Article successfully updated'}, status=status.HTTP_200_OK)
            except Article.DoesNotExist:
                return Response({"error": "Article does not exists"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"error": "User account not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        token = request.META.get('HTTP_TOKEN')
        user_account = get_user_account(token)

        if user_account:
            try:
                article = Article.objects.get(
                    reporter_account=user_account, key=kwargs['article_id'])
                article.delete()
                return Response({'message': "Article successfully deleted"}, status=status.HTTP_204_NO_CONTENT)
            except Article.DoesNotExist:
                return Response({'message': "You are not the author of the article"})


class BookmarkArticleView(ObtainAuthToken):
    def get(self, request, *args, **kwargs):
        bookmark_id = kwargs['bookmark_id']

        query = BookmarkedArticles.objects.get(id=bookmark_id)
        bookmark_data = BookmarkedArticlesSerializer(query).data
        bookmark_data['account'] = AccountSerializer(
            Account.objects.get(id=bookmark_data['account'])).data
        bookmark_data['saved'] = ArticleSerializer(
            Article.objects.get(id=bookmark_data['saved'])).data

        return Response(bookmark_data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        token = request.META.get('HTTP_TOKEN')
        user_account = get_user_account(token)
        article_id = kwargs['article_id']
        article = Article.objects.get(key=article_id)
        if user_account:
            try:
                BookmarkedArticles.objects.get(
                    account=user_account, saved=article)
                return Response({"error": "Article already bookmarked"}, status=status.HTTP_409_CONFLICT)
            except BookmarkedArticles.DoesNotExist:
                article_to_bookmark = BookmarkedArticles.objects.create(
                    account=user_account, saved=article)
                article_to_bookmark.save()
                return Response({"message": "Article successfully bookmarked", "id": article_to_bookmark.id}, status=status.HTTP_201_CREATED)

        return Response({"error": "User account not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        token = request.META.get('HTTP_TOKEN')
        user_account = get_user_account(token)
        article_id = kwargs['article_id']
        article = Article.objects.get(key=article_id)

        if user_account:
            try:
                BookmarkedArticles.objects.get(
                    account=user_account, saved=article).delete()
                return Response({"message": "Removed article bookmark"}, status=status.HTTP_204_NO_CONTENT)
            except BookmarkedArticles.DoesNotExist:
                return Response({"error": "Article bookmark not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"error": "User account not found"}, status=status.HTTP_404_NOT_FOUND)


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

# api/accounts/213/friends/request get account 213 friend requests
# api/accounts/        get all accounts
# api/accounts/213/   get account 213
# api/account/213/current

class AccountView(ObtainAuthToken):
    def get(self, request, *args, **kwargs):
        token = request.headers.get('token')
        user_account = get_user_account(token)
        get_account_id = kwargs['account_id']
        if get_account_id:
            try:
                account_query = Account.objects.get(key=get_account_id)
                account_data = AccountSerializer(account_query).data
                account_data['followers'] = count_followers_or_following(
                    account_query, "FOLLOWERS")
                if user_account:
                    try:
                        has_following = Followers.objects.get(
                            account=user_account, following_user=account_query)
                        account_data['is_following'] = True
                    except Followers.DoesNotExist:
                        account_data['is_following'] = False
                account_data['written_articles'] = len(
                    Article.objects.all().filter(reporter_account=account_query))
            except Account.DoesNotExist:
                return Response({"error": "Account does not exists"}, status=status.HTTP_404_NOT_FOUND)

            return Response({"error": "No account id provided"}, status=status.HTTP_400_BAD_REQUEST)
        all_account_query = Account.objects.all().exclude(key=user_account.key)
        queryset = {}
        for account in all_account_query:
            queryset[AccountSerializer(
                account).data['user']] = AccountSerializer(account).data
            queryset[AccountSerializer(account).data['user']]['key'] = AccountSerializer(
                account).data['key']
            queryset[AccountSerializer(account).data['user']]['written_articles'] = len(
                Article.objects.all().filter(reporter_account=account))
            queryset[AccountSerializer(account).data['user']]['followers'] = getFollow(
                account, "FOLLOWERS")
            try:
                Followers.objects.get(
                    account=user_account,
                    following_user=account,
                )
                queryset[AccountSerializer(
                    account).data['user']]['is_following'] = True
            except Followers.DoesNotExist:
                queryset[AccountSerializer(
                    account).data['user']]['is_following'] = False

        return Response(queryset)

    def post(self, request, *args, **kwargs):
        token = token = request.headers.get('token')
        token_obj = Token.objects.get(key=token)

        if token_obj == None:
            return Response({
                "error": "Token not found"
            },
                status=status.HTTP_404_NOT_FOUND)

        current_user_object = User.objects.get(id=token.user_id)
        try:
            account = Account.objects.get(
                email=request.data['email'],
            )
            return Response({
                "error": "Email already in user",
            },
                status=status.HTTP_400_BAD_REQUEST)

        except Account.DoesNotExist:
            account = Account.objects.create(
                user=current_user_object,
                key=AccountKeyGen(3),
                first_name=request.data['first_name'],
                last_name=request.data['last_name'],
                email=request.data['email'],
                profile_pic="/images/defaultProfilePic.png"
            )
            account.save()
            return Response(AccountSerializer(account).data, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        token = request.headers.get('token')
        user_account = get_user_account(token)
        try:
            account_query = Account.objects.get(account=user_account)
            account_query.delete()
            return Response({"error": "Account successfully deleted"},status=status.HTTP_204_NO_CONTENT)
        except Account.DoesNotExist:
            return Response({"error": "Account does not exists"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        token = request.headers.get('token')
        user_account = get_user_account(token)
        if user_account == None:
            return Response({
                "error": "User account not found"
            },
                status=status.HTTP_404_NOT_FOUND)

        Account.objects.filter(key=user_account.key).update(
            first_name=request.data['first_name'] if request.data['first_name'] != "" else user_account.account.first_name,
            last_name=request.data['last_name'] if request.data['last_name'] != "" else user_account.account.last_name,
            phone=request.data['phone'] if request.data['phone'] != "" else user_account.account.phone,
            bio=request.data['bio'] if request.data['bio'] != "" else user_account.account.bio,
            email=request.data['email'] if request.data['email'] != "" else user_account.account.email,
            occupation=request.data['occupation'] if request.data["occupation"] != "" else user_account.account.email,
        )

        return Response(
            AccountSerializer(user_account.account).data,
            status=status.HTTP_202_ACCEPTED,
        )


class TagView(APIView):
    def get(self, request, *args, **kwargs):
        tags = [tag[0] for tag in TAGS]
        return Response({'tags' : tags}, status=status.HTTP_200_OK)
    

# api/accounts/<id>/articles/
class AccountArticleView(ObtainAuthToken):
    def get(self, request, *args, **kwargs):
        token = request.headers.get('token')
        user_account = get_user_account(token)
        account_key = kwargs['account_id']

        #User Articles to retrieve
        account_to_view = Account.objects.get(key=account_key)
        article_query = Article.objects.filter(reporter_account=account_to_view)

        account_articles = {}
        for article in article_query:
            article_data = ArticleSerializer(article).data
            key = article_data['key']
            account_articles[key] = article_data
            account_articles[key]['reporter_account'] = AccountSerializer(account_to_view).data
            account_articles[key]['reporter_account']['followers'] = getFollow(account_to_view, "FOLLOWERS")
            if user_account:
                try:
                    BookmarkedArticles.objects.get(
                        account=user_account, saved=article)
                    account_articles[key]['isBookmarked'] = True
                except BookmarkedArticles.DoesNotExist:
                    account_articles[key]['isBookmarked'] = False

                try:
                    Followers.objects.get(
                        account=user_account, following_user=account_to_view)
                    account_articles[key]['reporter_account']['is_following'] = True
                except Followers.DoesNotExist:
                    account_articles[key]['reporter_account']['is_following'] = False
            else:
                account_articles[key]['isBookmarked'] = False
                account_articles[key]['reporter_account']['is_following'] = False

        return Response({'account_articles': account_articles}, status=status.HTTP_200_OK)