# hospital_map_app/views.py
from rest_framework import generics
from .models import HospitalMap
from .serializers import HospitalMapSerializer

class HospitalMapListCreateView(generics.ListCreateAPIView):
    queryset = HospitalMap.objects.all()
    serializer_class = HospitalMapSerializer

