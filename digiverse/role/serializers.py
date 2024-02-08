# serializers.py
from rest_framework import serializers
from .models import UserRole

class PatientOrAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRole
        fields = '__all__'

