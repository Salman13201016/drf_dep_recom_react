# registration/models.py
from django.db import models
from django.core.validators import MinLengthValidator

class Registration(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, validators=[MinLengthValidator(3)])
    email = models.EmailField(unique=True)
    mobile_no = models.CharField(max_length=15, unique=True)
    password = models.CharField(max_length=255)
    confirm_password = models.CharField(max_length=255)
    nid_or_birth_certificate = models.CharField(max_length=255)  # You can use a CharField or other appropriate field type
    v_code = models.CharField(max_length=500, unique=True)
    v_status = models.CharField(max_length=100)