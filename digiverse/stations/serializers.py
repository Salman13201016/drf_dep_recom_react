# stations/serializers.py
from rest_framework import serializers
from .models import Station
from divisions.models import Division
from districts.models import District

class StationSerializer(serializers.ModelSerializer):
    division_name = serializers.CharField(write_only=True)
    district_name = serializers.CharField(write_only=True)

    class Meta:
        model = Station
        fields = ['name', 'division_name', 'district_name']

    def create(self, validated_data):
        division_name = validated_data.pop('division_name')
        district_name = validated_data.pop('district_name')

        division, created = Division.objects.get_or_create(name=division_name)
        district, created = District.objects.get_or_create(name=district_name)

        validated_data['division'] = division
        validated_data['district'] = district

        return super().create(validated_data)

