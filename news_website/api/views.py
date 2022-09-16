from rest_framework import viewsets
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.views import APIView
from .APIUtility import *

#Fixed in ALlARticles
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().filter(isPrivate = False).order_by('rating')
    serializer_class = ArticleSerializer

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class APITEST(APIView):
    def get(self, request, *args, **kwargs):
        print(AccountKeyGen)
        return Response({
                        'key': AccountKeyGen(3),
                        })

class ArticleID(APIView):
    def post(self, request, *args, **kwargs):
        pass

    def get(self, request, *args, **kwargs):
        pass

