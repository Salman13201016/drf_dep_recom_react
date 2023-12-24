from django.db import models
from dashboard_from.models import Doctor_Depert_name
from hospital.models import hospital_categories

# Create your models here.
class hospital_department(models.Model):
    select_hosp = models.ForeignKey(hospital_categories, on_delete=models.CASCADE, null=True, blank=True)
    select_depart = models.ForeignKey(Doctor_Depert_name, on_delete=models.CASCADE, null=True, blank=True)
    
