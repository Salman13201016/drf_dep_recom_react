from django.urls import path
from .views import RoleViewSet

app_name = 'role'

urlpatterns = [
    path('roles/', RoleViewSet.as_view({'post': 'create', 'get': 'list'}), name='role-list'),
    path('roles/<int:pk>/', RoleViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='role-detail'),
]
