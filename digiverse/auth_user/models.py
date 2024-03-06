from django.db import models
from django.contrib.auth.hashers import check_password 

# Create your models here.
class user_register(models.Model):
    id = models.AutoField(primary_key=True)
    fname = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100)
    mobile = models.CharField(max_length=100)
    date_of_birth = models.DateField(null=True, blank=True)
    password = models.CharField(max_length=100)
    v_key = models.CharField(max_length = 500,default=0, unique=True)
    v_status = models.CharField(max_length = 500, default=0)
    user_image = models.ImageField(upload_to='user_images/', null=True, blank=True)
    
    def __str__(self):
        return self.fname
    
    
