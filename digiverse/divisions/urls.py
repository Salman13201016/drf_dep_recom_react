# divisions/urls.py
from django.urls import path
from .views import DivisionViewSet

app_name = 'divisions'

urlpatterns = [
    path('divisions/', DivisionViewSet.as_view({'post': 'create', 'get': 'list'}), name='division-list'),
    path('divisions/<int:pk>/', DivisionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='division-detail'),
]
