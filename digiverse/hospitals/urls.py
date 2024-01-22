# hospitals/urls.py
from django.urls import path
from .views import HospitalViewSet, NearestHospitalView

app_name = 'hospitals'

urlpatterns = [
    path('hospitals/', HospitalViewSet.as_view({'post': 'create', 'get': 'list'}), name='hospital-list'),
    path('hospitals/<int:pk>/', HospitalViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='hospital-detail'),
    path('nearest-hospitals/', NearestHospitalView.as_view(), name='nearest-hospitals'),
    
]

