from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from api.views import *

router = DefaultRouter()
router.register(r'AllArticles', ArticleViewSet)
router.register(r'Accounts', AccountViewSet)
# router.register(r'current_user', current_user)
# router.register(r'rest-auth/registration/', include('rest_auth.registration.urls'))
#router.register('rest-auth/', include('rest_auth.urls'))

urlpatterns = [
        path('rest-auth/', include('rest_auth.urls')),
        path('rest-auth/registration/', include('rest_auth.registration.urls')),
        path('AccountCreation/', AccountCreation, name="AccountCreation"),
        path('current_user/', current_user.as_view()),
        path('AllUserArticles/', AllUserArticles.as_view()),
        # path('PopularUserArticles/', PopularUserArticles, name="PopularUserArticles"),
    ]
urlpatterns += router.urls

    # path(r'^rest-auth/', include('rest_auth.urls'))
# urlpatterns = router.urls
#     # path('user', UserView.as_view()),
#     # path('SignUp', SignUpView.as_view()),
#     # path('Login', LoginView().as_view()),
#     path('auth', include('knox.urls')),
#     # path('auth/register', RegisterView.as_view()),
#     # path('account', AccountViewSet),
#     path('articles/', views.ArticleViewSet.as_view() ),
#     path('account/', views.AccountViewSet.as_view() ),
# ]