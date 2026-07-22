from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
import re

from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status

from .models import Profile
from .serializers import ProfileSerializer


# -----------------------------
# SIGNUP
# -----------------------------
@api_view(["POST"])
def signup(request):

    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    # Check required fields
    if not username or not email or not password:
        return Response(
            {"message": "All fields are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Username validation
    if len(username.strip()) < 3:
        return Response(
            {"message": "Username must be at least 3 characters"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Email validation
    try:
        validate_email(email)
    except ValidationError:
        return Response(
            {"message": "Invalid email address"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Duplicate username
    if User.objects.filter(username=username).exists():
        return Response(
            {"message": "Username already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Duplicate email
    if User.objects.filter(email=email).exists():
        return Response(
            {"message": "Email already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Password validation
    password_regex = (
        r"^(?=.*[a-z])"
        r"(?=.*[A-Z])"
        r"(?=.*\d)"
        r"(?=.*[@$!%*?&])"
        r".{8,}$"
    )

    if not re.match(password_regex, password):
        return Response(
            {
                "message": "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # Create User
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    # Create Profile
    Profile.objects.create(user=user)

    # Create Token
    token, created = Token.objects.get_or_create(user=user)

    return Response({
        "message": "Signup Successful",
        "token": token.key,
        "username": user.username,
        "email": user.email
    })


# -----------------------------
# LOGIN
# -----------------------------
@api_view(["POST"])
def login(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(
        username=username,
        password=password
    )

    if user:

        token, created = Token.objects.get_or_create(
            user=user
        )

        return Response({
            "message": "Login Successful",
            "token": token.key,
            "username": user.username,
            "email": user.email
        })

    return Response(
        {
            "message": "Invalid Username or Password"
        },
        status=status.HTTP_401_UNAUTHORIZED
    )


# -----------------------------
# GET PROFILE
# -----------------------------
@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):

    profile, created = Profile.objects.get_or_create(
        user=request.user
    )

    serializer = ProfileSerializer(profile)

    return Response(serializer.data)


# -----------------------------
# UPDATE PROFILE
# -----------------------------
@api_view(["PUT"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_profile(request):

    profile, created = Profile.objects.get_or_create(
        user=request.user
    )

    serializer = ProfileSerializer(
        profile,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response({
            "message": "Profile Updated Successfully"
        })

    return Response(serializer.errors)