from rest_framework import serializers
from .models import Symptom
from department.models import Department
from disease.models import Diseases

class SymptomSerializer(serializers.ModelSerializer):
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())
    disease = serializers.PrimaryKeyRelatedField(queryset=Diseases.objects.all())

    class Meta:
        model = Symptom
        fields = (
            'department',
            'disease',
            'symptom1',
            'symptom2',
            'symptom3',
            'symptom4',
            'symptom5',
            'symptom6',
            'symptom7',
            'symptom8',
            'symptom9',
            'symptom10',
            'symptom11',
            'symptom12',
            'symptom13',
            'symptom14',
            'symptom15',
            'symptom16',
            'symptom17',
        )
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        department = instance.department

        representation['department'] = {
            'id': department.id,
            'name' : department.name,
        }

        disease = instance.disease
        representation['disease']={
            'id' : disease.id,
            'name' : disease.name
        }
        return representation

