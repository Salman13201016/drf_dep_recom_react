# serializers.py
from rest_framework import serializers
from .models import address_name

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = address_name
        fields = '__all__'
