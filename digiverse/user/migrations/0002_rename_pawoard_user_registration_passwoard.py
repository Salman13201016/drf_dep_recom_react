# Generated by Django 4.2.7 on 2023-11-28 09:35

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("user", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="user_registration",
            old_name="pawoard",
            new_name="passwoard",
        ),
    ]