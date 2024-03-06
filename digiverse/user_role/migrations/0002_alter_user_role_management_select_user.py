# Generated by Django 5.0 on 2024-03-05 13:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_user', '0003_user_register_date_of_birth'),
        ('user_role', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user_role_management',
            name='select_user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_roles', to='auth_user.user_register', unique=True),
        ),
    ]
