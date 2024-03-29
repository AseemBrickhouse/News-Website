from ..serializers import *
from ..models import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


class TagView(APIView):
    def get(self, request, *args, **kwargs):
        tags = [tag[0] for tag in TAGS]
        return Response({'tags': tags}, status=status.HTTP_200_OK)
