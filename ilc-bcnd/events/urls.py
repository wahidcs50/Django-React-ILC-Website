from django.urls import path
from .views import EventListView, EventDetailView
from .views import get_applied_events, AppliedEventsListView, EventNotificationsViewList

urlpatterns = [
    path('events/', EventListView.as_view(), name='events'),
    path('interested_events/', AppliedEventsListView.as_view(), name='events'),
    path('events/<int:pk>', EventDetailView.as_view(), name='events_detail'),
    path('applied-events/', get_applied_events, name='applied_events'),
    path('eventnotifications/', EventNotificationsViewList.as_view(), name='events_notifications'),
]


