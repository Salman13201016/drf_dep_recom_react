# hospital_map_app/urls.py
from django.urls import path
from .views import HospitalMapListCreateView, HospitalMapRetrieveUpdateDestroyView

app_name = 'hospital_map_app'

urlpatterns = [
    path('hospital-maps/', HospitalMapListCreateView.as_view(), name='hospital-map-list-create'),
    path('hospital-maps/<int:pk>/', HospitalMapRetrieveUpdateDestroyView.as_view(), name='hospital-update'),
    
]
