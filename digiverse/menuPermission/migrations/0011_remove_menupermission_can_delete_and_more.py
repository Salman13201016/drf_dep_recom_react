# Generated by Django 5.0 on 2024-03-04 06:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('menuPermission', '0010_menupermission'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='menupermission',
            name='can_delete',
        ),
        migrations.RemoveField(
            model_name='menupermission',
            name='can_edit',
        ),
        migrations.RemoveField(
            model_name='menupermission',
            name='can_insert',
        ),
        migrations.RemoveField(
            model_name='menupermission',
            name='can_view',
        ),
    ]