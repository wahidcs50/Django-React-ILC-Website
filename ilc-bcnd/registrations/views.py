from django.conf import settings
from djoser.conf import settings as djoser_settings
from rest_framework.views import APIView
from rest_framework import generics
from userprofile.serializer import StudentProfileSerializer, AlumniProfileSerializer
from djoser.social.views import ProviderAuthView
from rest_framework import viewsets, status
from rest_framework.response import Response
from djoser.views import UserViewSet
from djoser import signals
from .serializer import CustomUserCreateSerializer
from .models import User, Student, Alumni
import requests
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)


class CustomProviderAuthView(ProviderAuthView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 201:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')

            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )
            response.set_cookie(
                'refresh',
                refresh_token,
                max_age=settings.AUTH_COOKIE_REFRESH_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )

        return response


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')

            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )
            response.set_cookie(
                'refresh',
                refresh_token,
                max_age=settings.AUTH_COOKIE_REFRESH_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )

        return response


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')

        if refresh_token:
            request.data['refresh'] = refresh_token

        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')

            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )

        return response


class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get('access')

        if access_token:
            request.data['token'] = access_token

        return super().post(request, *args, **kwargs)


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie('access')
        response.delete_cookie('refresh')

        return response

class CustomUserViewSet(UserViewSet):
    serializer_class = CustomUserCreateSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # Infer role from the URL path
            if 'student' in self.request.path:
                role = User.Role.STUDENT
            elif 'alumni' in self.request.path:
                role = User.Role.ALUMNI
            elif 'admin' in self.request.path:
                role = User.Role.ADMIN
            else:
                return Response({"role": ["Invalid role."]}, status=status.HTTP_400_BAD_REQUEST)

            user_data = serializer.validated_data.copy()
            del user_data['role']  # Remove role from user_data

            # Use appropriate create_* method based on role
            if role == User.Role.STUDENT:
                user = Student.objects.create_student(**user_data)
            elif role == User.Role.ALUMNI:
                user = Alumni.objects.create_alumni(**user_data)
            elif role == User.Role.ADMIN:
                user = User.objects.create_admin(**user_data)  # Use create_superuser for admins
            else:
                return Response({"role": ["Invalid role."]}, status=status.HTTP_400_BAD_REQUEST)

            # Call perform_create method to handle user creation and activation email sending
            return self.perform_create(serializer, user)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer, user):
        # Trigger the user_registered signal
        signals.user_registered.send(sender=self.__class__, user=user, request=self.request)

        # Send activation email if configured to do so
        if djoser_settings.SEND_ACTIVATION_EMAIL:  # Access SEND_ACTIVATION_EMAIL from djoser_settings
            context = {"user": user}
            to = [user.email]  # Use the user's email to send the activation email
            djoser_settings.EMAIL.activation(self.request, context).send(to)

        # Return the serialized user instance in the response
        serialized_user = {
            'id': user.id,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }
        return Response(serialized_user, status=status.HTTP_201_CREATED)
    


from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth import get_user_model

class UserActivationView(APIView):
    permission_classes = []
    authentication_classes = []
    def get(self, request, uidb64, token):
        try:
            # Decode the UID
            uid = urlsafe_base64_decode(uidb64).decode()
            # Get the user
            user_model = get_user_model()
            user = user_model.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, user_model.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            # Activate the user
            user.is_active = True
            user.save()
            return Response({"detail": "User activated successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid activation link."}, status=status.HTTP_400_BAD_REQUEST)


  
  
  
  
    
