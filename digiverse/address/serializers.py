# serializers.py
from rest_framework import serializers
from .models import address_name

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = address_name
        fields = '__all__'
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Include division details
        division = instance.division_fk
        representation['division_fk'] = {
            'id': division.id,
            'name': division.name,
        }

        # Include district details
        district = instance.district_fk
        representation['district_fk'] = {
            'id': district.id,
            'name': district.name,
        }

        # Include station details
        station = instance.station_fk
        representation['station_fk'] = {
            'id': station.id,
            'name': station.name,
        }

        # Include hospital type details
        hos_type = instance.hos_type_fk
        representation['hos_type_fk'] = {
            'id': hos_type.id,
            'name': hos_type.name,
        }

        return representation
    
