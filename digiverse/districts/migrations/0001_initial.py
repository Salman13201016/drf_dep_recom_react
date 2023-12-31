# Generated by Django 5.0 on 2023-12-21 17:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('divisions', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='District',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('division', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='divisions.division')),
            ],
        ),
    ]
