from django.urls import path
from .views import MenuListCreateAPIView, MenuRetrieveUpdateDestroyAPIView, MenuPermissionViewSet

urlpatterns = [
    path('menus/', MenuListCreateAPIView.as_view(), name='menu-list-create'),
    path('menus/<int:pk>/', MenuRetrieveUpdateDestroyAPIView.as_view(), name='menu-detail'),
    path('menuPermission/', MenuPermissionViewSet.as_view({'get': 'list', 'post': 'create'}), name='menu-permission'),
    path('menuPermission/<int:pk>/', MenuPermissionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='menu-permission-detail'),
]
