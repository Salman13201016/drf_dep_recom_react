from rest_framework import serializers
from .models import District

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        division = instance.division
        representation['division'] = {
            'id': division.id,
            'name' : division.name,
        }
        return representation
