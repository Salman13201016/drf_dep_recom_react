# registration/serializers.py
from rest_framework import serializers
from .models import Registration

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ['id', 'name', 'email', 'mobile_no', 'nid_or_birth_certificate', 'v_code', 'v_status']

