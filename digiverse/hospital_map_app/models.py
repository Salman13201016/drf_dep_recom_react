# hospital_map_app/models.py
from django.db import models
from hospitals.models import Hospital  # Import the Hospital model
from django.db.models import FloatField

class HospitalMap(models.Model):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    longitude = models.FloatField()
    latitude = models.FloatField()


    def __str__(self):
        return f"{self.hospital.name} Map"

    def save(self, *args, **kwargs):
        # Update the location field with the Point geometry
        self.location = FloatField(self.longitude, self.latitude)
        super().save(*args, **kwargs)
