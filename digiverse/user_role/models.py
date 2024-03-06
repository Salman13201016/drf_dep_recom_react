from django.db import models
from auth_user.models import user_register
from role.models import UserRole
from django.core.exceptions import ValidationError

# Create your models here.
class user_role_management(models.Model):
    select_role = models.ForeignKey(UserRole, on_delete=models.CASCADE, related_name='user_roles', null=True, blank=True)
    select_user = models.OneToOneField(user_register, on_delete=models.CASCADE, related_name='user_role')

    def __str__(self):
        return f"User: {self.select_user}, Role: {self.select_role}"

    def clean(self):
        # Check if the role is already assigned to another user
        existing_assignment = user_role_management.objects.filter(select_role=self.select_role).exclude(pk=self.pk).first()
        if existing_assignment:
            raise ValidationError('Role is already assigned to another user')

    def save(self, *args, **kwargs):
        self.full_clean()  # Run full validation
        super().save(*args, **kwargs)