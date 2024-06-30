# Generated by Django 5.0.1 on 2024-05-05 23:59

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, null=True)),
                ('company', models.CharField(max_length=100, null=True)),
                ('description', models.TextField(null=True)),
                ('location', models.CharField(max_length=100, null=True)),
                ('salary', models.CharField(blank=True, max_length=100, null=True)),
                ('application_deadline', models.DateField(null=True)),
                ('skills', models.TextField(null=True)),
                ('posted_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('contact_information', models.CharField(default='', max_length=200)),
                ('requirements', models.TextField()),
                ('duration_in_months', models.IntegerField(default=0)),
                ('job_type', models.CharField(choices=[('Job', 'Job'), ('Internship', 'Internship')], max_length=10)),
                ('placement', models.CharField(choices=[('Contract', 'Contract'), ('Permanent', 'Permanent')], default='Full-time', max_length=50)),
                ('timings', models.CharField(choices=[('Full-time', 'Full-time'), ('Part-time', 'Part-time')], default='Permanent', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='StudentCareerApplication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('application_status', models.CharField(choices=[('Pending', 'Pending'), ('Applied', 'Applied'), ('Expired', 'Expired')], default='Pending', max_length=10)),
                ('applied_date', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='JobsNotification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_read', models.BooleanField(default=False)),
                ('job_description', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='job_notifications_description', to='jobs.job')),
                ('job_title', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='job_notifications_title', to='jobs.job')),
                ('timestamp', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='jobs.job')),
            ],
            options={
                'verbose_name_plural': 'Jobs Notifications',
            },
        ),
    ]