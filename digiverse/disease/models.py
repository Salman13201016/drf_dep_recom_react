# from django.db import models
from django.db import models
from department.models import Department

class Diseases(models.Model):
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)


    def __str__(self):
        return self.name
        
