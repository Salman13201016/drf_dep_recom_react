from django.db import models


from django.db import models

class Role(models.Model):
    role_name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.role_name

# Create your models here.
