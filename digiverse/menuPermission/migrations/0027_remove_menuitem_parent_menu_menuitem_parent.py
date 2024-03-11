# Generated by Django 5.0 on 2024-03-10 06:49

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menuPermission', '0026_menuitem'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='menuitem',
            name='parent_menu',
        ),
        migrations.AddField(
            model_name='menuitem',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='menuPermission.menuitem'),
        ),
    ]
