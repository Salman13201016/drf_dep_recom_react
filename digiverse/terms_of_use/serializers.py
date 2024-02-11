from rest_framework import serializers
from .models import TermsOfUse

class TermsOfUseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TermsOfUse
        fields = '__all__'