# Generated by Django 5.0.1 on 2024-05-16 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0010_studentimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentimage',
            name='student_image',
            field=models.ImageField(upload_to='Profiledata/images/'),
        ),
    ]