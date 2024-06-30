from django.shortcuts import render
from .models import Job,StudentCareerApplication, JobsNotification
from .serializers import JobSerializer, AppliedJobsSerializer,JobsNotificationsSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view



# this is job list view
class JobListView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    
class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class AppliedJobsListView(generics.ListAPIView):
    queryset = StudentCareerApplication.objects.all()
    serializer_class = AppliedJobsSerializer

    
@api_view(['GET'])
def get_applied_jobs(request):
    user = request.user
    applied_jobs = StudentCareerApplication.objects.filter(student=user)
    serializer = AppliedJobsSerializer(applied_jobs, many=True)
    return Response(serializer.data)

class JobNotificationsViewList(generics.ListAPIView):
     queryset = JobsNotification.objects.all()
     serializer_class = JobsNotificationsSerializer