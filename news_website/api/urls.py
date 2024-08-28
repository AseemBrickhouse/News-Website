from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from api.views import *
from api.allViews.AccountViews import *
from api.allViews.FollowViews import *
from api.allViews.ArticleViews import *
from api.allViews.CommentViews import *
from api.allViews.ArticleRatingViews import *
from api.allViews.Test import *
from api.allViews.CommentRatingViews import *
from api.allViews.TagViews import *

router = DefaultRouter()
router.register(r'Articles', ArticleViewSet)
router.register(r'Accounts', AccountViewSet)


urlpatterns = [
    path('APITEST/', APITEST.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),

    # ALL OF THESE NEED TO GO
    path('AccountCreation/', AccountCreation.as_view()),
    # path('EditAccount/', EditAccount.as_view()),
    path('HasAccount/', HasAccount.as_view()),
    # path('current_user/', current_user.as_view()),
    path('AllUserArticles/', AllUserArticles.as_view()),
    path('PopularArticles/', PopularArticles.as_view()),
    path('AllArticles/', AllArticles.as_view()),
    path('PopularTags/', PopularTags.as_view()),
    path('AllAccounts/', AllAccounts.as_view()),
    path('DeleteArticle/', DeleteArticle.as_view()),
    path('Follow/', Follow.as_view()),
    path('unFollow/', unFollow.as_view()),
    path('myFollowers/', myFollowers.as_view()),
    path('myFollowing/', myFollowing.as_view()),
    path('MyBookmarkedArticles/', MyBookmarkedArticles.as_view()),
    path('SavedArticles/', SavedArticles.as_view()),
    path('GetUserArticles/', GetUserArticles.as_view()),
    # path('GetPerson/', GetPerson.as_view()),
    # path('HandleBookmark/', HandleBookmark.as_view()),
    path('GetArticle/', GetArticle.as_view()),
    path('UpdateRating/', UpdateRating.as_view()),


    # Account
    path("account/", AccountView.as_view(), name='get-post-account'),
    path("account/<str:account_id>/",
         AccountView.as_view(), name='get-account'),
    path("account/<str:account_id>/articles/",
         AccountArticleView.as_view(), name='account-articles'),
    path("account/<str:account_id>/articles/saved/",
         SavedArticles.as_view(), name='saved-articles'),
    path("account/<str:account_id>/comments/",
         GetUserComments.as_view(), name='user-comments'),
    path("account/<str:account_id>/comments/<str:article_id>",
         GetUserComments.as_view(), name='user-comments-article'),

    # General Article
    path("articles/", ArticleView.as_view()),
    path("articles/<str:article_id>/", ArticleView.as_view(),
         name='article-detail/article-update/article-delete'),

    # Article BookMarks
    path("articles/<str:article_id>/bookmark/",
         BookmarkArticleView.as_view(), name='article-bookmark'),
    path("articles/<str:article_id>/bookmark/<str:bookmark_id>/",
         BookmarkArticleView.as_view(), name='article-bookmark-id'),

    # Article Rating
    path("articles/<str:article_id>/rating/",
         ArticleRatingView.as_view(), name='article-rating'),

    # Tags
    path("tags/", TagView.as_view(), name='article-tags'),

    # General Comments
    path("articles/<str:article_id>/comments/",
         CommentView.as_view(), name='article-comment'),
    path("articles/<str:article_id>/comments/<str:comment_id>/",
         CommentView.as_view(), name='article-comment-id'),
    # path("articles/<str:article_id>/comments/<str:comment_id>/account/<str:account_id>", CommentView.as_view(), name='article-comment-user'),

    # Child Comments
    path("articles/<str:article_id>/comments/<str:comment_id>/children/",
         ChildComments.as_view(), name='article-child-comments'),

    # Parent Comment given a child
    path("articles/<str:article_id>/comments/<str:comment_id>/parent/",
         ParentComments.as_view(), name='article-parent-comments'),

    # Comment ratings
    path("articles/<str:article_id>/comments/<str:comment_id>/rating/",
         CommentRatingView.as_view(), name='article-comment-id-rating'),
    path("articles/<str:article_id>/comments/<str:comment_id>/rating/<str:rating_id>/",
         CommentRatingView.as_view(), name='article-comment-id-rating'),

    # path('GetComments/<str:article_key>/', GetComments.as_view(), name="GetComments"),
    # path('PopularUserArticles/', PopularUserArticles, name="PopularUserArticles"),
    # path(regex=r'^GetComments/(?P<username>\w{1,50})/$', view='GetComments'),
]
urlpatterns += router.urls
