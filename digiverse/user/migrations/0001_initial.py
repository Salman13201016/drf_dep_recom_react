# Generated by Django 4.2.7 on 2023-11-28 06:52

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="user_registration",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("full_name", models.CharField(max_length=50)),
                ("email", models.EmailField(max_length=50)),
                ("mobile", models.IntegerField()),
                ("pawoard", models.CharField(max_length=15)),
            ],
        ),
    ]