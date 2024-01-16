# hospital_map_app/views.py
from rest_framework import generics, views, response, status
from .models import HospitalMap
from .serializers import HospitalMapSerializer, NearestHospitalSerializer
from hospitals.models import Hospital
from django.db.models import Min
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import models
from rest_framework import status
from django.db.models import F, Func
from django.db.models import FloatField
from math import radians, cos, sin, acos, sqrt, atan2
# from geopy.geocoders import Nominatim 

class HospitalMapListCreateView(generics.ListCreateAPIView):
    queryset = HospitalMap.objects.all()
    serializer_class = HospitalMapSerializer
    
class HospitalMapRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HospitalMap.objects.all()
    serializer_class = HospitalMapSerializer

class NearestHospitalView(views.APIView):
    def get(self, request, *args, **kwargs):
        your_latitude = float(request.query_params.get('latitude', 0))
        your_longitude = float(request.query_params.get('longitude', 0))
        max_distance = float(request.query_params.get('max_distance', 100))

        data = self.get_nearby_hospitals(your_latitude, your_longitude, max_distance)
        return response.Response(data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        your_latitude = float(request.data.get('latitude', 0))
        your_longitude = float(request.data.get('longitude', 0))
        max_distance = float(request.data.get('max_distance', 100))

        data = self.get_nearby_hospitals(your_latitude, your_longitude, max_distance)
        return response.Response(data, status=status.HTTP_200_OK)

    def haversine(self, lat1, lon1, lat2, lon2):
        R = 6371  # Earth radius in kilometers

        dlat = radians(lat2 - lat1)
        dlon = radians(lon2 - lon1)

        a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))

        distance = R * c  # Distance in kilometers
        return distance

    def get_nearby_hospitals(self, your_latitude, your_longitude, max_distance):
        nearby_hospitals = (
            HospitalMap.objects
            .annotate(distance=F('latitude'))  # Update with your calculation
            .filter(distance__lte=max_distance)
        )

        serializer = HospitalMapSerializer(nearby_hospitals, many=True)
        return serializer.data