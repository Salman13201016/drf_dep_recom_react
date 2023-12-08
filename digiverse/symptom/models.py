from django.db import models

from department.models import Department
from disease.models import Diseases

class Symptom(models.Model):
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    disease = models.ForeignKey(Diseases, on_delete=models.CASCADE)
    symptom1 = models.CharField(max_length=255)
    symptom2 = models.CharField(max_length=255)
    symptom3 = models.CharField(max_length=255)
    symptom4 = models.CharField(max_length=255)
    symptom5 = models.CharField(max_length=255)
    symptom6 = models.CharField(max_length=255)
    symptom7 = models.CharField(max_length=255)
    symptom8 = models.CharField(max_length=255)
    symptom9 = models.CharField(max_length=255)
    symptom10 = models.CharField(max_length=255)
    symptom11 = models.CharField(max_length=255)
    symptom12 = models.CharField(max_length=255)
    symptom13 = models.CharField(max_length=255)
    symptom14 = models.CharField(max_length=255)
    symptom15 = models.CharField(max_length=255)
    symptom16 = models.CharField(max_length=255)
    symptom17 = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.department} - {self.disease} - Symptom ID: {self.pk}"
