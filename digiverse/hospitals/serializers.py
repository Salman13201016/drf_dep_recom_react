# hospitals/serializers.py
from rest_framework import serializers
from .models import Hospital
from divisions.models import Division
from districts.models import District
from hospital_categories.models import HospitalCategory
from stations.models import Station

class DivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Division
        fields = ('id', 'name')

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ('id', 'name')

class HospitalCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = HospitalCategory
        fields = ('id', 'name')

class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ('id', 'name')

class HospitalSerializer(serializers.ModelSerializer):
    division = DivisionSerializer()
    district = DistrictSerializer()
    hos_type = HospitalCategorySerializer()
    station = StationSerializer()

    class Meta:
        model = Hospital
        fields = '__all__'

