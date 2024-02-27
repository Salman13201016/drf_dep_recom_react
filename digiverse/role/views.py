# views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.db import IntegrityError
from rest_framework import status
from .models import UserRole, CRUDPermission, MenuPermission

from .serializers import PatientOrAdminSerializer, CRUDPermissionSerializer, MenuPermissionSerializer

class RoleViewSet(viewsets.ModelViewSet):
    queryset = UserRole.objects.all()
    serializer_class = PatientOrAdminSerializer


class CRUDPermissionViewSet(viewsets.ModelViewSet):
    queryset = CRUDPermission.objects.all()
    serializer_class = CRUDPermissionSerializer
    # lookup_field = 'id'  


class MenuPermissionViewSet(viewsets.ModelViewSet):
    queryset = MenuPermission.objects.all()
    serializer_class = MenuPermissionSerializer
    serializer_class = PatientOrAdminSerializer
