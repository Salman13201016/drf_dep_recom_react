from django.db import models
from auth_user.models import user_register
from role.models import patient_or_admin

# Create your models here.
class user_role_management(models.Model):
    select_role = models.ForeignKey(patient_or_admin, on_delete=models.CASCADE, null=True, blank=True)
    select_user = models.ForeignKey(user_register, on_delete=models.CASCADE, null=True, blank=True)
