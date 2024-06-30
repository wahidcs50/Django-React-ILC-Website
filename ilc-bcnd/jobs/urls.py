from django.urls import path
from .views import (
            JobListView, 
            JobDetailView,
            AppliedJobsListView,
            get_applied_jobs,
            JobNotificationsViewList
        )



urlpatterns = [
    path('jobs/', JobListView.as_view(), name='job_list'),
    path('applied-jobs-list/', AppliedJobsListView.as_view(), name='applied_job_list'),  # Add the URL for applied jobs
    path('jobs/<int:pk>/', JobDetailView.as_view(), name='job_detail'),
    path('applied-jobs/', get_applied_jobs, name='applied_jobs'),
    path('jobnotifications/', JobNotificationsViewList.as_view(), name='jobnotifications')
]
