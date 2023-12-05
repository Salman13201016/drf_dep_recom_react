# stations/serializers.py
from rest_framework import serializers
from .models import Station

class StationSerializer(serializers.ModelSerializer):
    division_name = serializers.ReadOnlyField(source='division.name')
    district_name = serializers.ReadOnlyField(source='district.name')

    class Meta:
        model = Station
        fields = ['id', 'name', 'division', 'district', 'division_name', 'district_name']
