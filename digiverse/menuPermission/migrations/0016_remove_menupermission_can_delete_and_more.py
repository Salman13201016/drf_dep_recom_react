# Generated by Django 5.0 on 2024-03-04 08:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('menuPermission', '0015_remove_menupermission_menu_url'),
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
    ]
