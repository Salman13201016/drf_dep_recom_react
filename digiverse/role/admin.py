from django.contrib import admin
from .models import UserRole, CRUDPermission, MenuPermission

admin.site.register(UserRole)
admin.site.register(CRUDPermission)
admin.site.register(MenuPermission)
