from django.db import models
from auth_user.models import user_register
from role.models import UserRole

# Create your models here.
class user_role_management(models.Model):
    select_role = models.ForeignKey(UserRole, on_delete=models.CASCADE, related_name='user_roles', null=True, blank=True)
    select_user = models.ForeignKey(user_register, on_delete=models.CASCADE, related_name='user_roles', null=True, blank=True)

