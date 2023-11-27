# hospitals/models.py
from django.db import models
from divisions.models import Division
from districts.models import District
from hospital_categories.models import HospitalCategory
from stations.models import Station

class Hospital(models.Model):
    division = models.ForeignKey(Division, on_delete=models.CASCADE)
    district = models.ForeignKey(District, on_delete=models.CASCADE)
    hos_type = models.ForeignKey(HospitalCategory, on_delete=models.CASCADE)
    station = models.ForeignKey(Station, on_delete=models.CASCADE)

    name = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=10)
    address = models.TextField()
    image = models.ImageField(upload_to='hospital_images/', null=True, blank=True)
    description = models.TextField()

    def __str__(self):
        return self.name

