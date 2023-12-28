# districts/models.py
from django.db import models
from divisions.models import Division  # Import the Division model

class District(models.Model):
    division = models.ForeignKey(Division, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name



