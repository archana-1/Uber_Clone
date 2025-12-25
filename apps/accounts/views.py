from django.shortcuts import render
from .serializers import RiderRegisterSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

# Create your views here.
@api_view(['POST'])
def registerrider(request):

    serializer = RiderRegisterSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Rider registered successfully'}, status= 201)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
def login(request):
    username = request.data.get('username').strip()
    password = request.data.get('password').strip()
    if not username or not password:
        return Response({"error" : "username and password required!"}, status=400)
    try:
        user = User.objects.get(username = username)
    except User.DoesNotExist:
        return Response({"error": "Invalid username or password"}, status= 400)

    if not check_password(password, user.password):
        return Response({"error": "Invalid username or password"}, status= 400)
    # create token

    refresh = RefreshToken.for_user(user)
    access = refresh.access_token
    return Response({
            "message": "Login successful",
            "access_token": str(access),
            "refresh_token": str(refresh),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        }, status=200)
