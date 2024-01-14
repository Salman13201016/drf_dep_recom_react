# hospital_map_app/serializers.py
from rest_framework import serializers
from .models import HospitalMap
from hospitals.serializers import HospitalSerializer 

class HospitalMapSerializer(serializers.ModelSerializer):
    hospital_name = serializers.CharField(source='hospital.name', read_only=True)

    class Meta:
        model = HospitalMap
        fields = ['id', 'longitude', 'latitude', 'hospital', 'hospital_name']
class NearestHospitalSerializer(serializers.ModelSerializer):
    hospital = HospitalSerializer(read_only=True)

    class Meta:
        model = HospitalMap
        fields = ['id', 'hospital', 'longitude', 'latitude', 'location']



