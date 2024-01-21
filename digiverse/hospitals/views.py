# hospitals/views.py
from rest_framework import viewsets
from .models import Hospital
from .serializers import HospitalSerializer
from rest_framework import generics, response, status, views
from django.db.models import F, Func, FloatField
from django.db.models.functions import ACos, Cos, Radians, Sin
from math import radians, cos, sin, acos, sqrt, atan2
from .models import Hospital
from .serializers import HospitalSerializer
from hospital_map_app.models import HospitalMap
from hospital_map_app.serializers import HospitalMapSerializer

class HospitalViewSet(viewsets.ModelViewSet):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer

class NearestHospitalView(views.APIView):
    def get(self, request, *args, **kwargs):
        your_latitude = float(request.query_params.get('lat', 0))  # Change to 'lat'
        your_longitude = float(request.query_params.get('long', 0))  # Change to 'long'
        max_distance = float(request.query_params.get('max_distance', 100))

        data = self.get_nearby_hospitals(your_latitude, your_longitude, max_distance)
        return response.Response(data, status=status.HTTP_200_OK)

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
    # Convert degrees to radians
        your_latitude_rad = radians(your_latitude)
        your_longitude_rad = radians(your_longitude)

    # Calculate distance using Haversine formula
        distance_formula = (
            6371 * ACos(
                Cos(Radians(your_latitude)) * Cos(Radians(F('latitude'))) *
                Cos(Radians(F('longitude')) - Radians(your_longitude)) +
                Sin(Radians(your_latitude)) * Sin(Radians(F('latitude')))
            )
        )

    # Filter nearby hospitals
        nearby_hospitals = (
            HospitalMap.objects
            .annotate(distance=distance_formula)
            .filter(distance__lte=max_distance)
        )

        print("Your Latitude:", your_latitude)
        print("Your Longitude:", your_longitude)
        print("Max Distance:", max_distance)
        print("Filtered Hospitals Count:", nearby_hospitals.count())  # Add this line for debugging

        serializer = HospitalMapSerializer(nearby_hospitals, many=True)
        return serializer.data
