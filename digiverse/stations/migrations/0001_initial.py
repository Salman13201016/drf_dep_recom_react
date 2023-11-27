# Generated by Django 4.2.3 on 2023-11-26 11:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('districts', '0001_initial'),
        ('divisions', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Station',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('district', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='districts.district')),
                ('division', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='divisions.division')),
            ],
        ),
    ]