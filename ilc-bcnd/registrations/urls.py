from django.urls import path, include
from rest_framework import routers






from .views import (CustomUserViewSet, CustomTokenObtainPairView,
                    CustomTokenRefreshView, CustomTokenVerifyView,
                    LogoutView, UserActivationView
)

# Define the router for API endpoints
router = routers.DefaultRouter()
router.register('student', CustomUserViewSet, basename='students')  # Use unique basenames
router.register('alumni', CustomUserViewSet, basename='alumni')
router.register('admin', CustomUserViewSet, basename='admins')


# Define urlpatterns for API endpoints
api_urlpatterns = [
    path('jwt/create/', CustomTokenObtainPairView.as_view()),
    path('jwt/refresh/', CustomTokenRefreshView.as_view()),
    path('jwt/verify/', CustomTokenVerifyView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('activate/<uidb64>/<token>/', UserActivationView.as_view(), name='user_activation'),
]
    

# Combine the router URLs and the API endpoint URLs
urlpatterns = router.urls + api_urlpatterns
