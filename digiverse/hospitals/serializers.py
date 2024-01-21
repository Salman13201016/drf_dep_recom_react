from rest_framework import serializers
from .models import Hospital
from divisions.models import Division
from districts.models import District
from hospital_categories.models import HospitalCategory
from stations.models import Station
from hospital_map_app.models import HospitalMap

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = '__all__'

    division = serializers.PrimaryKeyRelatedField(queryset=Division.objects.all())
    district = serializers.PrimaryKeyRelatedField(queryset=District.objects.all())
    hos_type = serializers.PrimaryKeyRelatedField(queryset=HospitalCategory.objects.all())
    station = serializers.PrimaryKeyRelatedField(queryset=Station.objects.all())

class NearestHospitalSerializer(serializers.ModelSerializer):
    hospital = HospitalSerializer(read_only=True)
    distance = serializers.FloatField(source='distance', read_only=True)
    class Meta:
        model = HospitalMap
        fields = ['id', 'hospital', 'longitude', 'latitude', 'location', 'distance']

