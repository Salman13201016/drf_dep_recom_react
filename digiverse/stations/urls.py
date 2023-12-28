# stations/urls.py
from django.urls import path
from .views import StationViewSet

app_name = 'stations'

urlpatterns = [
    path('stations/', StationViewSet.as_view({'post': 'create', 'get': 'list'}), name='station-list'),
    path('stations/<int:pk>/', StationViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='station-detail'),
]
