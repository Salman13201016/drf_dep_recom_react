# Generated by Django 5.0 on 2024-03-04 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menuPermission', '0017_remove_menupermission_can_view'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='menupermission',
            name='menu',
        ),
        migrations.AddField(
            model_name='menupermission',
            name='menu',
            field=models.ManyToManyField(to='menuPermission.menu'),
        ),
    ]