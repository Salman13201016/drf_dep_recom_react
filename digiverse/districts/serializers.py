# districts/serializers.py
from rest_framework import serializers
from .models import District
from divisions.models import Division

class DistrictSerializer(serializers.ModelSerializer):
    division = serializers.CharField(write_only=True)

    class Meta:
        model = District
        fields = ['name', 'division']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        division = instance.division
        representation['division'] = {
            'id': division.id,
            'serial_number': division.id,  
            'name': division.name,
        }
        return representation

    def create(self, validated_data):
        division_name = validated_data.pop('division')
        division, created = Division.objects.get_or_create(name=division_name)
        validated_data['division'] = division
        return super().create(validated_data)
