# Generated by Django 5.0 on 2024-02-08 06:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('role', '0002_alter_userrole_options_userrole_description_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userrole',
            name='description',
        ),
        migrations.AlterField(
            model_name='userrole',
            name='role',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]