from django.db import models
from django.contrib.auth.models import User
from role.models import UserRole
class Submenu(models.Model):
    url = models.URLField()

class Menu(models.Model):
    id = models.AutoField(primary_key=True)
    menu_name = models.CharField(max_length=100)
    submenu_status = models.BooleanField(default=False)
    menu_url = models.TextField(blank=True, null=True, unique = True) 
    submenu_name = models.CharField(max_length=200, blank=True, null=True)  # Allow multiple names separated by commas
    submenu_urls = models.TextField(blank=True, null=True, unique = True)  # Allow multiple URLs separated by commas
    menu_icon = models.CharField(max_length=50) 

    def __str__(self):
        return self.menu_name

    def save(self, *args, **kwargs):
        # If submenu_status is True, set menu_url to null
        if self.submenu_status:
            self.menu_url = None
        else:
            # Construct menu_url based on menu_name
            self.menu_url = f"http://localhost:5173/admin/"

        # Construct submenu_urls based on submenu_name
        if self.submenu_name:
            submenu_names = [name.strip() for name in self.submenu_name.split(',')]
            self.submenu_urls = ','.join([f"http://localhost:5173/{self.menu_name.lower().replace(' ', '_')}/{name.lower().replace(' ', '_')}/" for name in submenu_names])
        else:
            self.submenu_urls = ''

        super().save(*args, **kwargs)

class MenuPermission(models.Model):
    id = models.AutoField(primary_key=True)
    role = models.ForeignKey(UserRole, on_delete=models.CASCADE)
    menu = models.ManyToManyField(Menu)
    submenu = models.ManyToManyField(Submenu, related_name='submenu_permissions')
    

    def __str__(self):
        return f"Permission for {self.role} on {self.menu}"


 

    # def __str__(self):
    #     return f"Permissions for {self.user.username}"



