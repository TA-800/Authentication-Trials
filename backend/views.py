from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

import requests

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

from .models import *
from .serializers import *

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def courses(request):

    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    print(serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
def life(request):
    response = requests.get("https://opentdb.com/api.php?amount=10")

    data = response.json()

    if data["response_code"] == 0:
        return Response(data)
    else:
        return Response({
            "error": "Something went wrong"
        })

    


