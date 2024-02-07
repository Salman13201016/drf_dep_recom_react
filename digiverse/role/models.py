from django.db import models

class UserRole(models.Model):
    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('Subadmin', 'Subadmin'),
        ('Staff', 'Staff'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    def __str__(self):
        return self.role


