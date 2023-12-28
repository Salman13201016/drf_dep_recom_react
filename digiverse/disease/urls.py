from django.urls import path

from .views import DiseaseViewSet

urlpatterns = [
    path('disease/', DiseaseViewSet.as_view({'post': 'create', 'get': 'list'}), name = 'disease-list'),
    path('disease/<int:pk>/', DiseaseViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='disease-detail'),
]