# hospital_map_app/models.py
from django.db import models
from hospitals.models import Hospital  # Import the Hospital model

class HospitalMap(models.Model):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    longitude = models.FloatField()
    latitude = models.FloatField()

    def __str__(self):
        return f"{self.hospital.name} Map"
