# stations/serializers.py
from rest_framework import serializers
from .models import Station

class StationSerializer(serializers.ModelSerializer):
    division_name = serializers.ReadOnlyField(source='division.name')
    district_name = serializers.ReadOnlyField(source='district.name')

    class Meta:
        model = Station
        fields = ['id', 'name', 'division', 'district', 'division_name', 'district_name']

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     division = instance.division
    #     district = instance.district
    #     representation['division', 'district'] = {
    #         'division_id': division.id,
    #         'division_name' : division.name,
    #         'district_id' : district.id,
    #         'district_name' : district.name,

    #     }
    #     return representation
