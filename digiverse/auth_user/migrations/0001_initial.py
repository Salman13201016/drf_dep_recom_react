

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='user_register',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('fname', models.CharField(max_length=100, unique=True)),
                ('email', models.EmailField(max_length=100)),
                ('identy_no', models.CharField(max_length=100)),
                ('mobile', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('v_key', models.CharField(default=0, max_length=500, unique=True)),
                ('v_status', models.CharField(default=0, max_length=500)),
            ],
        ),
    ]
