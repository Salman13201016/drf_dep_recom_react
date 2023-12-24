from django.db import models
from dashboard_from.models import Doctor_Depert_name

# Create your models here.
class department_details(models.Model):
    select_dep = models.ForeignKey(Doctor_Depert_name, on_delete=models.CASCADE, null=True, blank=True)
    text = models.TextField(max_length=100,null=True, blank=True)
    put = models.CharField(max_length=50)
