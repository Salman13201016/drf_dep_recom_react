# serializers.py
from rest_framework import serializers
from .models import UserRole

class PatientOrAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRole
        fields = '__all__'


from .models import UserRole, CRUDPermission, MenuPermission

class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRole
        fields = '__all__'

class CRUDPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CRUDPermission
        fields = '__all__'

class MenuPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuPermission
        fields = '__all__'
