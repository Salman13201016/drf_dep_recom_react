# serializers.py
from rest_framework import serializers
from .models import patient_or_admin

class PatientOrAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = patient_or_admin
        def __str__(self):
            return self.patient_name
