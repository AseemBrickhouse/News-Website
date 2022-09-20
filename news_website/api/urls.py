from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from api.views import *
from api.allViews.AccountViews import *
from api.allViews.FollowViews import *
from api.allViews.ArticleViews import *

router = DefaultRouter()
router.register(r'Articles', ArticleViewSet)
router.register(r'Accounts', AccountViewSet)
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
        path('current_user/', current_user.as_view()),
        path('AllUserArticles/', AllUserArticles.as_view()),
        path('CreateNewArticle/', CreateNewArticle.as_view()),
        path('PopularArticles/', PopularArticles.as_view()),
        path('AllArticles/', AllArticles.as_view()),
        path('PopularTags/', PopularTags.as_view()),
        path('AllAccounts/', AllAccounts.as_view()),
        path('DeleteArticle/', DeleteArticle.as_view()),
        path('Follow/', Follow.as_view()),
        path('unFollow/', unFollow.as_view()),
        path('myFollowers/', myFollowers.as_view()),
        path('myFollowing/', myFollowing.as_view()),
        path('Bookmark/', Bookmark.as_view()),
        path('RemoveBookmark/', RemoveBookmark.as_view()),
        path('MyBookmarkedArticles/', MyBookmarkedArticles.as_view()),
        # path('PopularUserArticles/', PopularUserArticles, name="PopularUserArticles"),
    ]
urlpatterns += router.urls