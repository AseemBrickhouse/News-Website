from django.urls import path, include
from .views import *
from knox import views as knox_views
from rest_framework import routers, urlpatterns

router = routers.DefaultRouter()
router.register('account', AccountViewSet, 'account')
router.register('article', ArticleViewSet, 'article')

urlpatterns = router.urls
# urlpatterns = [
#     path('user', UserView.as_view()),
#     path('SignUp', SignUpView.as_view()),
#     path('Login', LoginView().as_view()),
#     path('auth', include('knox.urls')),
#     path('auth/register', RegisterView.as_view()),
#     path('account', AccountViewSet),
# ]
