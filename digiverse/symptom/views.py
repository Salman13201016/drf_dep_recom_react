from rest_framework import viewsets
from .models import Symptom
from .serializers import SymptomSerializer

class SymptomViewSet(viewsets.ModelViewSet):
    queryset = Symptom.objects.all()
    serializer_class = SymptomSerializer

