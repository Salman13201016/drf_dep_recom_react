from rest_framework import serializers
from .models import Diseases

class DiseasesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diseases
        fields = '__all__'