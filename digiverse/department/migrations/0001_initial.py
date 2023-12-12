# Generated by Django 4.2.7 on 2023-12-11 08:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('hospitals', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('details', models.TextField(max_length=255)),
                ('hospital', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hospitals.hospital')),
            ],
        ),
    ]
