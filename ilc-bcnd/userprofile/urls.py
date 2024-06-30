from django.urls import path
from .views import (
                    StudentInfoListView, StudentProfileCreateView, ProfileImageCreate,ProfileImageDetail,
                    StudentProfileUpdateDestroyView, 
                    AlumniProfileCreateView, AlumniProfileUpdatedestroyView
                    )

urlpatterns = [
    path('student-info/', StudentInfoListView.as_view(), name='student-profile-list-create'),
    path('student/image/', ProfileImageCreate.as_view(), name='profile-image'),
    path('student/image/<int:pk>/', ProfileImageDetail.as_view(), name='profile-image-detail'),
    path('student-profile/', StudentProfileCreateView.as_view(), name='student-profile-create'),
    path('student-profile/update/<int:pk>/', StudentProfileUpdateDestroyView.as_view(), name='student-profile-update-destroy'),
    path('alumni-profile/', AlumniProfileCreateView.as_view(), name='alumni-profile-create'),
    path('alumni-profile/<int:pk>/', AlumniProfileUpdatedestroyView.as_view(), name='alumni-profile-update-destroy'),
]
