from django.db import models



class UserRole(models.Model):
    role = models.CharField(max_length=20, unique=True)

    class Meta:
        verbose_name = 'User Role' #This is used to provide a human-readable name for the model in the Django admin interface.
        verbose_name_plural = 'User Roles'

    def __str__(self):
        return self.role

class CRUDPermission(models.Model):
    id = models.AutoField(primary_key=True)
    role = models.ForeignKey(UserRole, on_delete=models.CASCADE)
    view = models.BooleanField(default=False)
    insert = models.BooleanField(default=False)
    edit = models.BooleanField(default=False)
    delete = models.BooleanField(default=False)
   

class MenuPermission(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


