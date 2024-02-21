# serializers.py
from rest_framework import serializers
from .models import user_role_management
from role.serializers import PatientOrAdminSerializer  # Import the PatientOrAdminSerializer
from auth_user.serializers import SignUpSerializer  # Import the UserRegisterSerializer
from role.models import UserRole


class UserRoleSerializer(serializers.ModelSerializer):
    user_fname = serializers.SerializerMethodField()

    class Meta:
        model = UserRole
        fields = ['id', 'user_fname']  # Include other fields if needed

    def get_user_fname(self, obj):
        return obj.user.fname if obj.user else None
    
class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_role_management
        fields = '__all__'


class UserRoleDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_role_management
        fields = '__all__'

class UserRolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_role_management
        fields = '__all__'