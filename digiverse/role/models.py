from django.db import models

# Create your models here.

class patient_or_admin(models.Model):
    id = models.AutoField(primary_key=True)
    patient_name = models.CharField(max_length=500, unique=True,null=True, blank=True)
