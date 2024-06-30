from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

class Event(models.Model):
    EVENT_TYPES = [
        ('career_fair', 'Career Fair'),
        ('workshop', 'Workshop'),
        ('seminar', 'Seminar'),
        ('conference', 'Conference'),
        ('networking_event', 'Networking Event'),
    ]
    title = models.CharField(max_length=100, null=True)
    organizer = models.CharField(max_length=100, null=True)
    description = models.TextField(null=True)
    location = models.CharField(max_length=100,null=True)
    date_and_time = models.DateTimeField(default=timezone.now)
    registration_deadline = models.DateField(blank=True, null=True)
    event_type = models.CharField(max_length=50, choices=EVENT_TYPES, null=True)
    target_audience = models.CharField(max_length=100, null=True)
    registration_link = models.URLField(blank=True, null=True)
    contact_information = models.CharField(max_length=200, default='')
    images=models.ImageField(upload_to='Eventsdata/images/', default='')

    def __str__(self):
        return self.title
    
class StudentEventApplication(models.Model):
    APPLICATION_STATUSES = [
        ('Pending', 'Pending'),
        ('Applied', 'Applied'),
        ('Expired', 'Expired'),
    ]

    student = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    application_status = models.CharField(max_length=10, choices=APPLICATION_STATUSES, default='Pending')
    applied_date = models.DateTimeField(default=timezone.now)  # Add applied_date field

    def __str__(self):
        return f"{self.student.first_name}-{self.student.last_name}  - {self.event.title} - {self.application_status}"
class EventsNotification(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    event_detail=models.ForeignKey(Event, on_delete=models.CASCADE, null=True, blank=True, related_name='job_notifications_title')
    # event_description = models.ForeignKey(Event, on_delete=models.CASCADE, null=True, blank=True, related_name='job_notifications_description')
    # timestamp = models.ForeignKey(Event, on_delete=models.CASCADE)
    # is_read = models.BooleanField(default=False)
    class Meta:
        verbose_name_plural = "Event Notifications"
    def __str__(self):
        return f"{self.event_detail.title} - {self.event_detail.description}"

