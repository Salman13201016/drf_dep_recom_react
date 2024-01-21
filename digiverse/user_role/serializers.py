# serializers.py
from rest_framework import serializers
from .models import user_role_management
from role.models import patient_or_admin
from auth_user.models import user_register

class PatientOrAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = patient_or_admin
        fields = '__all__'

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_register
        fields = '__all__'

class UserRoleManagementSerializer(serializers.ModelSerializer):
    # Use the PatientOrAdminSerializer for the 'patient_or_admin' field
    patient_or_admin = PatientOrAdminSerializer()

    # Use the UserRegisterSerializer for the 'user_register' field
    user_register = UserRegisterSerializer()

    class Meta:
        model = user_role_management
        fields = '__all__'
