from django.db import models

class Submenu(models.Model):
    url = models.URLField()

class Menu(models.Model):
    id = models.AutoField(primary_key=True)
    menu_name = models.CharField(max_length=100, blank=True, null=True)
    submenu_status = models.BooleanField(default=False)
    menu_url = models.URLField(blank=True, null=True)
    submenu_name = models.CharField(max_length=100, blank=True, null=True)
    submenu_urls = models.ManyToManyField(Submenu)
    menu_icon = models.CharField(max_length=50) 

    def __str__(self):
        return self.menu_name

