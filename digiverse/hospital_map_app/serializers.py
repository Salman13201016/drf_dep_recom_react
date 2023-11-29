# hospital_map_app/serializers.py
from rest_framework import serializers
from .models import HospitalMap

class HospitalMapSerializer(serializers.ModelSerializer):
    hospital_name = serializers.CharField(source='hospital.name', read_only=True)

    class Meta:
        model = HospitalMap
        fields = ['id', 'longitude', 'latitude', 'hospital', 'hospital_name']


