from django.db import models

from department.models import Department
from disease.models import Diseases

class Symptom(models.Model):
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    disease = models.ForeignKey(Diseases, on_delete=models.CASCADE)
    symptom1 = models.CharField(max_length=255, blank=True, null=True)
    symptom2 = models.CharField(max_length=255, blank=True, null=True)
    symptom3 = models.CharField(max_length=255, blank=True, null=True)
    symptom4 = models.CharField(max_length=255, blank=True, null=True)
    symptom5 = models.CharField(max_length=255, blank=True, null=True)
    symptom6 = models.CharField(max_length=255, blank=True, null=True)
    symptom7 = models.CharField(max_length=255, blank=True, null=True)
    symptom8 = models.CharField(max_length=255, blank=True, null=True)
    symptom9 = models.CharField(max_length=255, blank=True, null=True)
    symptom10 = models.CharField(max_length=255, blank=True, null=True)
    symptom11 = models.CharField(max_length=255, blank=True, null=True)
    symptom12 = models.CharField(max_length=255, blank=True, null=True)
    symptom13 = models.CharField(max_length=255, blank=True, null=True)
    symptom14 = models.CharField(max_length=255, blank=True, null=True)
    symptom15 = models.CharField(max_length=255, blank=True, null=True)
    symptom16 = models.CharField(max_length=255, blank=True, null=True)
    symptom17 = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.department} - {self.disease} - Symptom ID: {self.pk}"
