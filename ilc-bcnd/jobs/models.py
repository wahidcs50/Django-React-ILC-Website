from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
class Job(models.Model):
    CAREER_TYPES = [
        ('Job', 'Job'),
        ('Internship', 'Internship'),
    ]
    PLACING=[
        ('Contract', 'Contract'),
        ('Permanent', 'Permanent'),
    ]
    TIMINGS=[
        ('Full-time', 'Full-time'),
        ('Part-time', 'Part-time'),
    ]

    title = models.CharField(max_length=100,null=True)
    company = models.CharField(max_length=100, null=True)
    description = models.TextField(null=True)
    location = models.CharField(max_length=100, null=True)
    salary = models.CharField(max_length=100, blank=True, null=True)
    application_deadline = models.DateField(null=True)
    skills = models.TextField(null=True)
    posted_date = models.DateTimeField(default=timezone.now)
    contact_information = models.CharField(max_length=200,default='')
    requirements = models.TextField()
    duration_in_months = models.IntegerField(default=0)
    job_type = models.CharField(max_length=10, choices=CAREER_TYPES)
    placement = models.CharField(max_length=50, choices=PLACING, default='Full-time')
    timings= models.CharField(max_length=50, choices=TIMINGS, default='Permanent')
    
    # # New field for application status
    # application_status = models.CharField(max_length=10, choices=APPLICATION_STATUSES, default='Pending')

    def __str__(self):
        return self.title
        #   if self.title:
        #         return self.title
        #   else:
        #         return "Untitled Job"

class StudentCareerApplication(models.Model):
    APPLICATION_STATUSES = [
        ('Pending', 'Pending'),
        ('Applied', 'Applied'),
        ('Expired', 'Expired'),
    ]

    student = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    career = models.ForeignKey(Job, on_delete=models.CASCADE)
    application_status = models.CharField(max_length=10, choices=APPLICATION_STATUSES, default='Pending')
    applied_date = models.DateTimeField(default=timezone.now)  # Add applied_date field
    
    
    def __str__(self):
        student_fname = self.student.first_name if self.student else "Unknown Student"
        student_lname = self.student.last_name if self.student else "Unknown Student"
        career_title = self.career.title if self.career else "Unknown Career"
        return f"{student_fname} - {student_lname} - {career_title} - {self.application_status}"


    # def __str__(self):
    #     return f"{self.student.email} - {self.career.title} - {self.application_status}"
class JobsNotification(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    job_title=models.ForeignKey(Job, on_delete=models.CASCADE, null=True, blank=True, related_name='job_notifications_title')
    job_description = models.ForeignKey(Job, on_delete=models.CASCADE, null=True, blank=True, related_name='job_notifications_description')
    timestamp = models.ForeignKey(Job, on_delete=models.CASCADE)
    is_read = models.BooleanField(default=False)
    class Meta:
        verbose_name_plural = "Jobs Notifications"
     
    def save(self, *args, **kwargs):
        if not self.job_title:
            self.job_title = self.job_title.title if self.job_title else None
        if not self.job_description:
            self.job_description = self.job_description.description if self.job_description else None
        if not self.timestamp:
            self.timestamp = self.timestamp.posted_date if self.timestamp else None
        super().save(*args, **kwargs)
    def __str__(self):
        return f"{self.job_title} - {self.job_description}"
