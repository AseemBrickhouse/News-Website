from rest_framework.routers import DefaultRouter
from api.views import *

router = DefaultRouter()
router.register(r'', ArticleViewSet)
urlpatterns = router.urls

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
