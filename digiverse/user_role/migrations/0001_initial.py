<<<<<<< HEAD
# Generated by Django 4.2.7 on 2024-02-08 05:30
=======
<<<<<<< HEAD
# Generated by Django 5.0 on 2024-02-07 15:10
=======
<<<<<<< HEAD
# Generated by Django 4.2.7 on 2024-02-08 05:30
=======
# Generated by Django 5.0 on 2024-02-07 15:10
>>>>>>> 1ea2990fd88a65e24530d9b0d4d112200fce3e1e
>>>>>>> 96acf7817ef147d5c12c935d042e7f8decd11959
>>>>>>> 676111dfb09e508fecf94e054024d6174530aec1

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth_user', '0001_initial'),
        ('role', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='user_role_management',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('select_role', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_roles', to='role.userrole')),
                ('select_user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_roles', to='auth_user.user_register')),
            ],
        ),
    ]
