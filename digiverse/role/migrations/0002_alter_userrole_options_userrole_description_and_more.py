# Generated by Django 5.0 on 2024-02-08 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('role', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userrole',
            options={'verbose_name': 'User Role', 'verbose_name_plural': 'User Roles'},
        ),
        migrations.AddField(
            model_name='userrole',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='userrole',
            name='role',
            field=models.CharField(choices=[('Admin', 'Admin'), ('Subadmin', 'Subadmin'), ('Staff', 'Staff')], max_length=20, unique=True),
        ),
    ]