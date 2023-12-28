from django.db import models
from dashboard_from.models import Doctor_Depert_name
from hospitals.models import HospitalCategory

# Create your models here.
class Department_history_prediction(models.Model):
   selected_dept = models.CharField(max_length=500)
   dept_status = models.CharField(max_length=500)
   final_result = models.CharField(max_length=500)
    
