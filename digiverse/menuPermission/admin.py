# hospitals/admin.py
from django.contrib import admin
from .models import Menu, MenuPermission, MenuItem

admin.site.register(Menu)
admin.site.register(MenuPermission)
admin.site.register(MenuItem)