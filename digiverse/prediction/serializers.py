from rest_framework import serializers
from .models import  Department_history_prediction
from symptom.models import Symptom
from nltk.corpus import stopwords
import nltk

class SymptomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symptom
        fields = '__all__'

class DepartmentHistoryPredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department_history_prediction
        fields = '__all__'
        
class SymptomDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symptom
        fields = '__all__'
        
class CleanedTextField(serializers.CharField):
    def to_internal_value(self, data):
        cleaned_text = self.clean_text(data)
        return super().to_internal_value(cleaned_text)

    def clean_text(self, text):
        if isinstance(text, str):
            text = text.lower()
            text = ' '.join(word for word in text.split() if word not in stopwords.words('english'))
        return text
    

class CleanTextSerializer(serializers.Serializer):
    text = serializers.CharField()

class CleanDataSerializer(serializers.Serializer):
    symptom1 = CleanTextSerializer()
    symptom2 = CleanTextSerializer()
    symptom3 = CleanTextSerializer()
    symptom4 = CleanTextSerializer()
    symptom5 = CleanTextSerializer()
    symptom6 = CleanTextSerializer()
    symptom7 = CleanTextSerializer()
    symptom8 = CleanTextSerializer()
    symptom9 = CleanTextSerializer()
    symptom10 = CleanTextSerializer()
    symptom11 = CleanTextSerializer()
    symptom12 = CleanTextSerializer()
    symptom13 = CleanTextSerializer()
    symptom14 = CleanTextSerializer()
    symptom15 = CleanTextSerializer()
    symptom16 = CleanTextSerializer()
    symptom17 = CleanTextSerializer()