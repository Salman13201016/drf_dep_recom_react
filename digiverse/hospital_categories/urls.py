# hospital_categories/urls.py
from django.urls import path
from .views import HospitalCategoryViewSet

app_name = 'hospital_categories'

urlpatterns = [
    path('hospital_categories/', HospitalCategoryViewSet.as_view({'post': 'create', 'get': 'list'}), name='hospital-category-list'),
    path('hospital_categories/<int:pk>/', HospitalCategoryViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='hospital-category-detail'),
]
