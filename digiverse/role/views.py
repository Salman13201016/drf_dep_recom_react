# views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.db import IntegrityError
from rest_framework import status

from .models import patient_or_admin
from .serializers import PatientOrAdminSerializer

class PatientOrAdminViewSet(viewsets.ModelViewSet):
    queryset = patient_or_admin.objects.all()
    serializer_class = PatientOrAdminSerializer

    @action(detail=False, methods=['post'])
    def role_store(self, request):
        try:
            patient_name = request.data.get('patient')
            if len(patient_name) < 4:
                return Response({'error': 'Minimum 4 characters required.'}, status=status.HTTP_400_BAD_REQUEST)

            if patient_or_admin.objects.filter(patient_name=patient_name).exists():
                return Response({'info': 'This name already exists.'}, status=status.HTTP_200_OK)
            else:
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response({'success': 'Data has been inserted successfully.'}, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({'error': 'Data insertion failed.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['put'])
    def role_update(self, request, pk=None):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'success': 'Data has been updated successfully.'}, status=status.HTTP_200_OK)
        except IntegrityError:
            return Response({'error': 'Data update failed.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['delete'])
    def role_delete(self, request, pk=None):
        try:
            instance = self.get_object()
            instance.delete()
            return Response({'success': 'Data has been deleted successfully.'}, status=status.HTTP_200_OK)
        except IntegrityError:
            return Response({'error': 'Data deletion failed.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
