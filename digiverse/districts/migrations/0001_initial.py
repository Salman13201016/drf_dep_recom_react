# Generated by Django 4.2.3 on 2023-11-26 11:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('divisions', '0001_initial'),
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