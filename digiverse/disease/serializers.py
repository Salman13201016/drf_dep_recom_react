from rest_framework import serializers
from .models import Diseases

class DiseasesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diseases
        fields = '__all__'
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Include division details
        department = instance.department
        representation['department'] = {
            'id': department.id,
            'name': department.name,
        }
        return representation