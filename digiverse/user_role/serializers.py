# serializers.py
from rest_framework import serializers
from .models import user_role_management
from role.serializers import PatientOrAdminSerializer  # Import the PatientOrAdminSerializer
from auth_user.serializers import SignUpSerializer  # Import the UserRegisterSerializer


class UserRoleSerializer(serializers.ModelSerializer):
    select_role = PatientOrAdminSerializer()
    select_user = SignUpSerializer()

    class Meta:
        model = user_role_management
        fields = '__all__'

class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_role_management
        fields = '__all__'


class UserRoleDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_role_management
        fields = '__all__'
