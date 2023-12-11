# hospital_categories/serializers.py
from rest_framework import serializers
from .models import HospitalCategory

class HospitalCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = HospitalCategory
        fields = '__all__'
