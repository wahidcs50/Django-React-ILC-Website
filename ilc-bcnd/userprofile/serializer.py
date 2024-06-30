from rest_framework import serializers
from .models import (
                      StudentImage,
                      StudentProfile, 
                      Education, Skills,
                      Projects, Experience, 
                      AlumniProfile
                    )
from registrations.models import User


class StudentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model= StudentImage
        fields= ['id','student_image']
class StudendInfoSerializer(serializers.ModelSerializer):
    # profile_image = serializers.ImageField()
    class Meta:
        model = User
        fields = ["first_name", "last_name","email"]

    # def create(self, validated_data):
    #     student = validated_data['student']
    #     full_name = f"{student.first_name} {student.last_name}"
    #     profile = StudentProfile.objects.create(studentname=full_name, **validated_data)
    #     return profile

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'field_of_study', 'department', 'degree', 'institution']

class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = ['id', 'skills']

class ProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = ['id', 'project_name', 'project_desc', 'project_technique_tools',]

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id',  'experince_company', 'experince_explain', ]

class StudentProfileSerializer(serializers.ModelSerializer):
    education = EducationSerializer(many=True, required=False)
    skills = SkillsSerializer(many=True, required=False)
    projects = ProjectsSerializer(many=True, required=False)
    experience = ExperienceSerializer(many=True, required=False)

    class Meta:
        model = StudentProfile
        fields = ['id', 'name', 'phone', 'github_url', 'linkedin_url', 'education', 'skills', 'projects', 'experience']

    def create(self, validated_data):
        education_data = validated_data.pop('education')
        skills_data = validated_data.pop('skills')
        projects_data = validated_data.pop('projects')
        experience_data = validated_data.pop('experience')

        profile = StudentProfile.objects.create(**validated_data)
        profile.name = f"{validated_data['student'].first_name} {validated_data['student'].last_name}"
        profile.save()

        for education_item_data in education_data:
            Education.objects.create(profile=profile, **education_item_data)

        for skills_item_data in skills_data:
            Skills.objects.create(profile=profile, **skills_item_data)

        for projects_item_data in projects_data:
            Projects.objects.create(profile=profile, **projects_item_data)

        for experience_item_data in experience_data:
            Experience.objects.create(profile=profile, **experience_item_data)

        return profile

    def update(self, instance, validated_data):
        education_data = validated_data.pop('education', [])
        skills_data = validated_data.pop('skills', [])
        projects_data = validated_data.pop('projects', [])
        experience_data = validated_data.pop('experience', [])

        # Update nested serializers
        if education_data:
            instance.education.all().delete()
            for education_item_data in education_data:
                Education.objects.create(profile=instance, **education_item_data)

        if skills_data:
            instance.skills.all().delete()
            for skills_item_data in skills_data:
                Skills.objects.create(profile=instance, **skills_item_data)

        if projects_data:
            instance.projects.all().delete()
            for projects_item_data in projects_data:
                Projects.objects.create(profile=instance, **projects_item_data)

        if experience_data:
            instance.experience.all().delete()
            for experience_item_data in experience_data:
                Experience.objects.create(profile=instance, **experience_item_data)

        # Update instance fields
        for field, value in validated_data.items():
            setattr(instance, field, value)

        instance.save()
        return instance









class AlumniProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumniProfile
        fields = '__all__'

# class StudentRegistrationSerializer(UserCreateSerializer):
#     student_profile = StudentProfileSerializer()

#     class Meta(UserCreateSerializer.Meta):
#         fields = UserCreateSerializer.Meta.fields + ('student_profile',)

#     def create(self, validated_data):
#         user = super().create(validated_data)
#         student_profile_data = validated_data.pop('student_profile')
#         student_profile = StudentProfile.objects.create(user=user, **student_profile_data)
#         return user


# class AlumniRegistrationSerializer(UserCreateSerializer):
#     alumni_profile = AlumniProfileSerializer()

#     class Meta(UserCreateSerializer.Meta):
#         fields = UserCreateSerializer.Meta.fields + ('alumni_profile',)

#     def perform_create(self, validated_data):
#         alumni_profile_data = validated_data.pop('alumni_profile')
#         user = super().perform_create(validated_data)
#         AlumniProfile.objects.create(user=user, **alumni_profile_data)
#         return user
