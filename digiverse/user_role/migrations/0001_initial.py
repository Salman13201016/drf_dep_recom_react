
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
