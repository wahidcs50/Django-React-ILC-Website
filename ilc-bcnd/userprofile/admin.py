from django.contrib import admin
from .models import StudentProfile, AlumniProfile, Education, Experience, Projects, Skills, StudentImage


class StudentprofileAdmin(admin.ModelAdmin):
    model=StudentProfile
    list_display= ["student" ]
    
class AlumniprofileAdmin(admin.ModelAdmin):
    model=AlumniProfile
    list_display= ["alumni", 'date_of_birth', 'address', 
             
            ]

    
admin.site.register(StudentProfile,StudentprofileAdmin)
admin.site.register(Education)
admin.site.register(Experience)
admin.site.register(Projects)
admin.site.register(Skills)
admin.site.register(StudentImage)
admin.site.register(AlumniProfile, AlumniprofileAdmin)
