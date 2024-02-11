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
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Include division details
        division = instance.division
        representation['division'] = {
            'id': division.id,
            'name': division.name,
        }

        # Include district details
        district = instance.district
        representation['district'] = {
            'id': district.id,
            'name': district.name,
        }

        # Include hospital type details
        hos_type = instance.hos_type
        representation['hos_type'] = {
            'id': hos_type.id,
            'name': hos_type.name,
        }

        # Include station details
        station = instance.station
        representation['station'] = {
            'id': station.id,
            'name': station.name,
        }

        return representation

class NearestHospitalSerializer(serializers.ModelSerializer):
    hospital = HospitalSerializer(read_only=True)
    distance = serializers.FloatField(source='distance', read_only=True)
    class Meta:
        model = HospitalMap
        fields = ['id', 'hospital', 'longitude', 'latitude', 'location', 'distance']

