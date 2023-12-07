# departments/urls.py
from django.urls import path
from .views import DepartmentViewSet

urlpatterns = [
    path('department/', DepartmentViewSet.as_view({'post': 'create', 'get': 'list'}), name='department-list'),
    path('department/<int:pk>/', DepartmentViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='department-detail'),
]

