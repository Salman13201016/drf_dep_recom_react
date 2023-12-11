# hospital_map_app/urls.py
from django.urls import path
from .views import HospitalMapListCreateView

urlpatterns = [
    path('hospital-maps/', HospitalMapListCreateView.as_view(), name='hospital-map-list-create'),
]
