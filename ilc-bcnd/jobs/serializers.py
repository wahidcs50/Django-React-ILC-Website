from .models import Job, StudentCareerApplication, JobsNotification
from rest_framework import serializers

class JobSerializer(serializers.ModelSerializer):
   class Meta:
       model=Job
       fields="__all__"   

class AppliedJobsSerializer(serializers.ModelSerializer):
    applied_date = serializers.DateTimeField(format='%B %d, %Y %H:%M:%S')  # Format the applied_date field
    career=JobSerializer()
    class Meta:
        model = StudentCareerApplication
        fields = '__all__'

class JobsNotificationsSerializer(serializers.ModelSerializer):
    job_title=JobSerializer()
    job_description=JobSerializer()
    timestamp=JobSerializer()
    class Meta:
        model= JobsNotification
        fields = '__all__'