# department/serializers.py
from rest_framework import serializers
from .models import Department

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Include division details
        hospital = instance.hospital
        representation['hospital'] = {
            'id': hospital.id,
            'name': hospital.name,
        }
        return representation

