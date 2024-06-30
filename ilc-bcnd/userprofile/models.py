from django.db import models
from django.conf import settings    
from django.db.models.signals import post_save
from django.dispatch import receiver
from registrations.models import Student, Alumni

class StudentImage(models.Model):
    student = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    student_image = models.ImageField(upload_to='Profiledata/images/')
    

class StudentProfile(models.Model):
    student = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile')
    phone = models.CharField(max_length=15, blank=True)   
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    # date_of_birth = models.DateField(default='2000-01-01', blank=True)
    # address = models.TextField(blank=True)
    name = models.CharField(max_length=255, blank=True)  # Add name as a field
    # email= models.EmailField(max_length=255, blank=True)

    # def save(self, *args, **kwargs):
    #     # Update name field before saving
    #     self.name = f"{self.student.first_name} {self.student.last_name}"
    #     self.email = f"{self.student.email}"
    #     super().save(*args, **kwargs)

    def __str__(self):
        return self.student.email
    
class Education(models.Model):
    profile = models.ForeignKey(StudentProfile, related_name='education', on_delete=models.CASCADE, default=None)
    field_of_study = models.CharField(max_length=255, blank=True)
    department = models.CharField(max_length=255, blank=True)
    degree = models.CharField(max_length=255, blank=True)
    institution = models.CharField(max_length=255, blank=True)

class Skills(models.Model):
    profile = models.ForeignKey(StudentProfile, related_name='skills', on_delete=models.CASCADE,default=None)
    skills = models.TextField(blank=True)

class Projects(models.Model):
    profile = models.ForeignKey(StudentProfile, related_name='projects', on_delete=models.CASCADE,default=None)
    project_name = models.TextField(default='', blank=True)
    project_desc = models.TextField(default='', blank=True)
    project_technique_tools = models.TextField(default='', blank=True)
    # project_image = models.ImageField(upload_to='Profiledata/images/', default='', blank=True)

class Experience(models.Model):
    profile = models.ForeignKey(StudentProfile, related_name='experience', on_delete=models.CASCADE,default=None)
    # experince_from = models.DateField(default=None, null=True, blank=True)
    # experince_to = models.DateField(default=None, null=True, blank=True)
    experince_company = models.CharField(max_length=255, default='', blank=True)
    experince_explain = models.TextField(default='')
    # experince_portfolio = models.URLField(max_length=255, default='', blank=True)


class AlumniProfile(models.Model):
    alumni = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='alumni_profile')
    field_of_study = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    date_of_birth = models.DateField(default='2000-01-01')
    address = models.TextField()
    degree = models.CharField(max_length=255)
    institution = models.CharField(max_length=255)
    graduation_year = models.IntegerField(default=2020)
    skills = models.TextField()

    def __str__(self):
        return self.alumni.email

@receiver(post_save, sender=Student)
def create_student_profile(sender, instance, created, **kwargs):
    if created and instance.role == 'STUDENT':
        StudentProfile.objects.create(student=instance)

@receiver(post_save, sender=Alumni)
def create_alumni_profile(sender, instance, created, **kwargs):
    if created and instance.role == 'ALUMNI':
        AlumniProfile.objects.create(alumni=instance)