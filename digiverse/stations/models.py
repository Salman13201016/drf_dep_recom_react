# stations/models.py
from django.db import models
from divisions.models import Division
from districts.models import District

class Station(models.Model):
    division = models.ForeignKey(Division, on_delete=models.CASCADE)
    district = models.ForeignKey(District, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

