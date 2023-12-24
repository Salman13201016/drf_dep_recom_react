from django.db import models

class user_registration(models.Model):
    full_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    mobile = models.IntegerField()
    passwoard = models.CharField(max_length=15)
    
    

