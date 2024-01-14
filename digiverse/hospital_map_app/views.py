# hospital_map_app/views.py
from rest_framework import generics
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

class HospitalMapListCreateView(generics.ListCreateAPIView):
    queryset = HospitalMap.objects.all()
    serializer_class = HospitalMapSerializer
    
class HospitalMapRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HospitalMap.objects.all()
    serializer_class = HospitalMapSerializer

class NearestHospitalView(APIView):
    def get(self, request, *args, **kwargs):
        your_latitude = float(request.query_params.get('latitude', 0))
        your_longitude = float(request.query_params.get('longitude', 0))
        max_distance = float(request.query_params.get('max_distance', 10))

        data = self.get_nearby_hospitals(your_latitude, your_longitude, max_distance)
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        your_latitude = float(request.data.get('latitude', 0))
        your_longitude = float(request.data.get('longitude', 0))
        max_distance = float(request.data.get('max_distance', 10))

        data = self.get_nearby_hospitals(your_latitude, your_longitude, max_distance)
        return Response(data, status=status.HTTP_200_OK)

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
            .filter()  # Add any additional filters if needed
        )

        data = [
            {
                'id': hospital.id,
                'hospital_name': hospital.hospital.name,
                'latitude': hospital.latitude,
                'longitude': hospital.longitude,
                'distance': self.haversine(your_latitude, your_longitude, hospital.latitude, hospital.longitude)
            }
            for hospital in nearby_hospitals
            if self.haversine(your_latitude, your_longitude, hospital.latitude, hospital.longitude) <= max_distance
        ]

        return data