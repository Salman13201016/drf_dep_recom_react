from django.db import models
from divisions.models import Division
from districts.models import District
from hospitals.models import HospitalCategory
from stations.models import Station

# Create your models here.

class address_name(models.Model):
    id = models.AutoField(primary_key=True)
    division_fk = models.ForeignKey(Division, on_delete=models.CASCADE,null=True, blank=True)
    district_fk = models.ForeignKey(District, on_delete=models.CASCADE,null=True, blank=True)
    station_fk = models.ForeignKey(Station, on_delete=models.CASCADE,null=True, blank=True)
    hos_type_fk = models.ForeignKey(HospitalCategory, on_delete=models.CASCADE,null=True, blank=True)
    hos_name = models.CharField(max_length=100,null=True, blank=True)
    zip_code = models.CharField(max_length=100,null=True, blank=True)
    address = models.CharField(max_length=100,null=True, blank=True)
    image = models.ImageField(upload_to='productimg')
    description = models.TextField(max_length=100,null=True, blank=True)
    
    