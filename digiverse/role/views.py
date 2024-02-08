# views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.db import IntegrityError
from rest_framework import status

from .models import UserRole
from .serializers import PatientOrAdminSerializer

class UserRoleViewSet(viewsets.ViewSet):
    queryset = UserRole.objects.all()
    serializer_class = PatientOrAdminSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        role = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(role)
        return Response(serializer.data)

    def update(self, request, pk=None):
        role = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(role, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        role = get_object_or_404(self.queryset, pk=pk)
        role.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)