# Generated by Django 5.0 on 2024-02-22 05:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_user', '0002_remove_user_register_identy_no'),
    ]

    operations = [
        migrations.AddField(
            model_name='user_register',
            name='date_of_birth',
            field=models.DateField(blank=True, null=True),
        ),
    ]
