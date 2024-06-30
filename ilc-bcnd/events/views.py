from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Event, StudentEventApplication, EventsNotification
from .serializers import AppliedEventsSerializer, EventsSerializer, EventsNotificationsSerializer

class EventListView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventsSerializer
    
class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventsSerializer
class AppliedEventsListView(generics.ListAPIView):
    queryset = StudentEventApplication.objects.all()
    serializer_class = AppliedEventsSerializer


@api_view(['GET'])
def get_applied_events(request):
    user = request.user
    applied_events = StudentEventApplication.objects.filter(student=user)
    serializer = AppliedEventsSerializer(applied_events, many=True)
    return Response(serializer.data)

class EventNotificationsViewList(generics.ListAPIView):
        queryset = EventsNotification.objects.all()
        serializer_class = EventsNotificationsSerializer