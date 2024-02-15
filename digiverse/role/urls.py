from django.urls import path
from .views import RoleViewSet, CRUDPermissionViewSet, MenuPermissionViewSet
from .views import RoleViewSet

app_name = 'role'

urlpatterns = [
    path('roles/', RoleViewSet.as_view({'post': 'create', 'get': 'list'}), name='role-list'),
    path('roles/<int:pk>/', RoleViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='role-detail'),
    path('crudOperation/', CRUDPermissionViewSet.as_view({'get': 'list', 'post': 'create'}), name='crud-operation-list'),
    path('crudOperation/<int:pk>/', CRUDPermissionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='crud-operation-detail'),
    path('menuPermission/', MenuPermissionViewSet.as_view({'get': 'list', 'post': 'create'}), name='menu-permission'),
    path('menuPermission/<int:pk>/', MenuPermissionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='menu-permission-detail'),
    
]
