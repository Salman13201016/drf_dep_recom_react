# hospital_categories/views.py
from rest_framework import viewsets
from .models import HospitalCategory
from .serializers import HospitalCategorySerializer

class HospitalCategoryViewSet(viewsets.ModelViewSet):
    queryset = HospitalCategory.objects.all()
    serializer_class = HospitalCategorySerializer
