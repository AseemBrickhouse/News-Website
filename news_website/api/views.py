from rest_framework import viewsets
from .serializers import *
from .models import *
from rest_framework.response import Response
import datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
    
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().filter(isPrivate = False)
    serializer_class = ArticleSerializer

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

#Useless can remove
@api_view(['GET', 'POST']) 
def AccountCreation(request):
    if request.method == 'POST':
        queryset = User.objects.all()
        account = queryset[0]
        print(account)
        print(account.first_name)
    return Response(request.data)

class current_user(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        token = Token.objects.get(key=request.data['token'])
        account = User.objects.all().filter(id=token.user_id)[0].account
        popularArticles = PopularUserArticles(account)
        data = {
            'first_name' : account.first_name,
            'last_name' : account.last_name,
            'creation_date' : account.creation_date,
            'role' : account.role,
            'phone' : account.phone,
            'popular_articles': popularArticles,
        }
        return Response(data)

    def get(self, request):
        pass


class AllUserArticles(ObtainAuthToken):
        def post(self, request, *args, **kwargs):
            token = Token.objects.get(key=request.data['token'])
            account = User.objects.all().filter(id=token.user_id)[0].account
            queryset = Article.objects.all().filter(reporter_account=account)
            # serializer_class = ArticleSerializer(data[0])
            AllArticles = {}
            for article in queryset:
                data = ArticleSerializer(article)
                AllArticles[data.data['id']] = data.data

            print(AllArticles)
            return Response(AllArticles)
        
        def get(self, request, *args, **kwargs):
            pass


def PopularUserArticles(account):
    queryset = Article.objects.all().filter(reporter_account=account).order_by('rating')
    if len(queryset) < 4:
        return queryset
    else:
        popular_articles = {
            'first': {
                'headline': queryset[3].headline,
                # 'reporter_account' : queryset[0].reporter_account,
                'rating': queryset[3].rating,
                'article_description': queryset[3].article_description
            },
            'second': {
                'headline': queryset[2].headline,
                # 'reporter_account' : queryset[1].reporter_account,
                'rating': queryset[2].rating,
                'article_description': queryset[2].article_description
            },
            'third': {
                'headline': queryset[1].headline,
                # 'reporter_account' : queryset[2].reporter_account,
                'rating': queryset[1].rating,
                'article_description': queryset[1].article_description
            },
            'fourth': {
                'headline': queryset[0].headline,
                # 'reporter_account' : queryset[3].reporter_account,
                'rating': queryset[0].rating,
                'article_description': queryset[0].article_description
            }
        }
        # print(popular_articles)
        return(popular_articles)
