# Generated by Django 5.0.1 on 2024-05-05 23:59

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('field_of_study', models.CharField(blank=True, max_length=255)),
                ('department', models.CharField(blank=True, max_length=255)),
                ('degree', models.CharField(blank=True, max_length=255)),
                ('institution', models.CharField(blank=True, max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('experince_from', models.DateField(blank=True, default=None, null=True)),
                ('experince_to', models.DateField(blank=True, default=None, null=True)),
                ('experince_company', models.CharField(blank=True, default='', max_length=255)),
                ('experince_explain', models.TextField(default='')),
                ('experince_portfolio', models.URLField(blank=True, default='', max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Projects',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project_name', models.TextField(blank=True, default='')),
                ('project_desc', models.TextField(blank=True, default='')),
                ('project_technique_tools', models.TextField(blank=True, default='')),
                ('project_image', models.ImageField(blank=True, default='', upload_to='Profiledata/images/')),
            ],
        ),
        migrations.CreateModel(
            name='Skills',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('skills', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='AlumniProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('field_of_study', models.CharField(max_length=255)),
                ('department', models.CharField(max_length=255)),
                ('date_of_birth', models.DateField(default='2000-01-01')),
                ('address', models.TextField()),
                ('degree', models.CharField(max_length=255)),
                ('institution', models.CharField(max_length=255)),
                ('graduation_year', models.IntegerField(default=2020)),
                ('skills', models.TextField()),
                ('alumni', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='alumni_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='StudentProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(blank=True, max_length=15)),
                ('github_url', models.URLField(blank=True)),
                ('linkedin_url', models.URLField(blank=True)),
                ('date_of_birth', models.DateField(default='2000-01-01')),
                ('address', models.TextField(blank=True)),
                ('education', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='userprofile.education')),
                ('experience', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='userprofile.experience')),
                ('projects', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='userprofile.projects')),
                ('skills', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='userprofile.skills')),
                ('student', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='student_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]