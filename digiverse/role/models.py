from django.db import models

class UserRole(models.Model):
    role = models.CharField(max_length=20, unique=True)

    class Meta:
        verbose_name = 'User Role'
        verbose_name_plural = 'User Roles'

    def __str__(self):
        return self.role


