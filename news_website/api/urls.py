from django.urls import path, include
# from .views import *
from . import views
from knox import views as knox_views
from rest_framework import routers, urlpatterns

# router = routers.DefaultRouter()
# router.register(r'account', AccountViewSet)
# router.register(r'article/{id}', ArticleViewSet)

# urlpatterns = router.urls
urlpatterns = [
#     # path('user', UserView.as_view()),
#     # path('SignUp', SignUpView.as_view()),
#     # path('Login', LoginView().as_view()),
#     path('auth', include('knox.urls')),
#     # path('auth/register', RegisterView.as_view()),
#     # path('account', AccountViewSet),
    path('articles/', views.ArticleViewSet.as_view() ),
    path('account/', views.AccountViewSet.as_view() ),
]
