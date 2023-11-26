# districts/urls.py
from django.urls import path
from .views import DistrictViewSet

app_name = 'districts'

urlpatterns = [
    path('districts/', DistrictViewSet.as_view({'post': 'create', 'get': 'list'}), name='district-list'),
    path('districts/<int:pk>/', DistrictViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='district-detail'),
]
