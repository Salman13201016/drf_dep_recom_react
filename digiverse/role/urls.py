from django.urls import path
from .views import PatientOrAdminViewSet

app_name = 'role'

urlpatterns = [
    path('roles/', PatientOrAdminViewSet.as_view({'post': 'create', 'get': 'list'}), name='role-list'),
    path('roles/<int:pk>/', PatientOrAdminViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='role-detail'),
]
