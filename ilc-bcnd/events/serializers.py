from .models import Event, StudentEventApplication, EventsNotification
from rest_framework import serializers

class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields= '__all__'
class AppliedEventsSerializer(serializers.ModelSerializer):
    applied_date = serializers.DateTimeField()
    event=EventsSerializer()
    class Meta:
        model = StudentEventApplication
        fields = '__all__'
class EventsNotificationsSerializer(serializers.ModelSerializer):
    event_detail=EventsSerializer()
   
    class Meta:
        model= EventsNotification
        fields = '__all__'