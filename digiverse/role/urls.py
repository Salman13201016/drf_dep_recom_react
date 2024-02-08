from django.urls import path
from .views import UserRoleViewSet

app_name = 'role'

urlpatterns = [
    path('roles/', UserRoleViewSet.as_view({'post': 'create', 'get': 'list'}), name='role-list'),
    path('roles/<int:pk>/', UserRoleViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='role-detail'),
]
