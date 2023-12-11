# department/models.py
from django.db import models
from hospitals.models import Hospital
class Department(models.Model):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    details = models.TextField(max_length=255)

    def __str__(self):
        return self.name

#Nirban007

