# Generated by Django 4.2.7 on 2023-12-12 07:41

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Registration',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, validators=[django.core.validators.MinLengthValidator(3)])),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('mobile_no', models.CharField(max_length=15, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('confirm_password', models.CharField(max_length=255)),
                ('nid_or_birth_certificate', models.CharField(max_length=255)),
                ('email_verified', models.BooleanField(default=False)),
                ('verification_code', models.CharField(blank=True, max_length=10, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
