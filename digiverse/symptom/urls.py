from django.urls import path

from .views import SymptomViewSet

urlpatterns = [
    path('symptom/', SymptomViewSet.as_view({'post': 'create', 'get': 'list'}), name= 'symptom-list'),
    path('symptom/<int:pk>/', SymptomViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='symptom-detail'),
]