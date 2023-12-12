# registration/serializers.py
from rest_framework import serializers
from .models import Registration
import re

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ['id', 'name', 'email', 'mobile_no', 'nid_or_birth_certificate']
    def validate_password(self, value):
        # Check for at least 1 capital letter, 1 number, and 1 special character
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Password must contain at least 1 capital letter.")
        if not re.search(r'\d', value):
            raise serializers.ValidationError("Password must contain at least 1 number.")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
            raise serializers.ValidationError("Password must contain at least 1 special character.")

        return value

    def validate(self, data):
        # Ensure that password and confirm_password match
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        if password and confirm_password and password != confirm_password:
            raise serializers.ValidationError("Password and Confirm Password do not match")

        return data

class EmailVerificationSerializer(serializers.Serializer):
    verification_code = serializers.CharField(max_length=10)
