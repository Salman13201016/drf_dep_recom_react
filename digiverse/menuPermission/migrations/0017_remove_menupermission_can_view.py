# Generated by Django 5.0 on 2024-03-04 09:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('menuPermission', '0016_remove_menupermission_can_delete_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='menupermission',
            name='can_view',
        ),
    ]