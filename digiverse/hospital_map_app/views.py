# hospital_map_app/views.py
from rest_framework import generics, views, response, status
from .models import HospitalMap
from .serializers import HospitalMapSerializer
from hospitals.models import Hospital
from django.db.models import Min
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import models
from rest_framework import status
from django.db.models import F, Func, ExpressionWrapper
from django.db.models import FloatField
from math import radians, cos, sin, acos, sqrt, atan2
from django.db.models.functions import ACos, Cos, Radians, Sin, ASin, Sqrt
# from geopy.geocoders import Nominatim 

class HospitalMapListCreateView(generics.ListCreateAPIView):
    queryset = HospitalMap.objects.all()
    serializer_class = HospitalMapSerializer
    
class HospitalMapRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HospitalMap.objects.all()
    serializer_class = HospitalMapSerializer

