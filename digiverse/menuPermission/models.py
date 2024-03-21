from django.db import models
from role.models import UserRole

class Menu(models.Model):
    id = models.AutoField(primary_key=True)
    menu_name = models.CharField(max_length=100)
    menu_url = models.URLField(blank=True, null=True, unique=True)
    menu_icon = models.CharField(max_length=50)

    def __str__(self):
        return self.menu_name

class Submenu(models.Model):
    id = models.AutoField(primary_key=True)
    submenu_name = models.CharField(max_length=200)
    submenu_url = models.URLField(blank=True, null=True, unique=True)
    menu = models.ForeignKey(Menu, related_name='submenus', on_delete=models.CASCADE)

    def __str__(self):
        return self.submenu_name

class MenuPermission(models.Model):
    id = models.AutoField(primary_key=True)
    role = models.ForeignKey(UserRole, on_delete=models.CASCADE)
    menu_permission = models.BooleanField(default=False)
    menus = models.ManyToManyField(Menu, related_name='menu_permissions')
    submenus = models.ManyToManyField(Submenu, related_name='menu_permissions')

    def __str__(self):
        return f"Permission for {self.role} on {self.menu_id}"

