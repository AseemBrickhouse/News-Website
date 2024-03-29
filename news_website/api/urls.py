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

router = DefaultRouter()
router.register(r'Articles', ArticleViewSet)
router.register(r'Accounts', AccountViewSet)
# router.register(r'^GetComments/(?P<article_key>\w{1,50})/$', GetComments)
# router.register(r'CreateNewArticle/', CreateNewArticle.as_view(), basename='CreateNewArticle')
# router.register(r'current_user', current_user)
# router.register(r'rest-auth/registration/', include('rest_auth.registration.urls'))
#router.register('rest-auth/', include('rest_auth.urls'))

urlpatterns = [
        path('APITEST/', APITEST.as_view()),
        path('rest-auth/', include('rest_auth.urls')),
        path('rest-auth/registration/', include('rest_auth.registration.urls')),
        path('AccountCreation/', AccountCreation.as_view()),
        path('EditAccount/', EditAccount.as_view()),
        path('HasAccount/', HasAccount.as_view()),
        path('current_user/', current_user.as_view()),
        path('AllUserArticles/', AllUserArticles.as_view()),
        # path('CreateNewArticle/', CreateNewArticle.as_view()),
        path('PopularArticles/', PopularArticles.as_view()),
        path('AllArticles/', AllArticles.as_view()),
        path('PopularTags/', PopularTags.as_view()),
        path('AllAccounts/', AllAccounts.as_view()),
        path('DeleteArticle/', DeleteArticle.as_view()),
        path('Follow/', Follow.as_view()),
        path('unFollow/', unFollow.as_view()),
        path('myFollowers/', myFollowers.as_view()),
        path('myFollowing/', myFollowing.as_view()),
        # path('Bookmark/', Bookmark.as_view()),
        # path('RemoveBookmark/', RemoveBookmark.as_view()),
        path('MyBookmarkedArticles/', MyBookmarkedArticles.as_view()),
        path('SavedArticles/', SavedArticles.as_view()),
        path('GetUserArticles/', GetUserArticles.as_view()),
        path('GetPerson/', GetPerson.as_view()),
        path('HandleBookmark/', HandleBookmark.as_view()),
        path('GetArticle/', GetArticle.as_view()),
        path('GetComments/', GetComments.as_view()),
        path('UpdateRating/', UpdateRating.as_view()),
        path('CreateComment/', CreateComment.as_view()),
        path('UpdateComment/', UpdateComment.as_view()),
        path('DeleteComment/', DeleteComment.as_view()),



        #account
        path("account/", AccountView.as_view(), name='get-account'),
        path("account/<str:account_id>/", AccountView.as_view(), name='get-account'),
        #test article related items
        path("articles/", ArticleView.as_view()),
        path("articles/<str:article_id>/", ArticleView.as_view(), name='article-detail/article-update/article-delete'),

        path("articles/<str:article_id>/bookmark/", BookmarkArticleView.as_view(), name='article-bookmark'),
        path("articles/<str:article_id>/bookmark/<str:bookmark_id>/", BookmarkArticleView.as_view(), name='article-bookmark-id'),
        
        path("articles/<str:article_id>/rating/", ArticleRatingView.as_view(), name='article-rating'),
        # path("articles/<str:article_id>/rating/<>", ArticleRatingView.as_view(), name='article-rating'),
        path("tags/", TagView.as_view(), name='article-tags'),

        path("articles/<str:article_id>/comments/", CommentView.as_view(), name='article-comment'),
        path("articles/<str:article_id>/comments/<str:comment_id>/", CommentView.as_view(), name='article-comment-id'),

        path("articles/<str:article_id>/comments/<str:comment_id>/rating/", CommentRatingView.as_view(), name='article-comment-id-rating'),
        path("articles/<str:article_id>/comments/<str:comment_id>/rating/<str:rating_id>/", CommentRatingView.as_view(), name='article-comment-id-rating'),
        
        path("accounts/<str:account_id>/articles/", AccountArticleView.as_view(), name='account-articles'),
        # path('GetComments/<str:article_key>/', GetComments.as_view(), name="GetComments"),
        # path('PopularUserArticles/', PopularUserArticles, name="PopularUserArticles"),
        # path(regex=r'^GetComments/(?P<username>\w{1,50})/$', view='GetComments'),
    ]
urlpatterns += router.urls