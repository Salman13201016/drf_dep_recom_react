# views.py
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import user_role_management
from .serializers import PatientOrAdminSerializer, UserRegisterSerializer, UserRoleManagementSerializer
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from django. contrib import messages
from auth_user.models import user_register
from role.models import patient_or_admin

class UserRolePanelViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    def list(self, request):
        print(request.headers)  # Print request headers
        print(request.session.keys())  # Print session keys

        google_data = request.session.get('social_auth_google-oauth2')
        if 'user_id' in request.session or google_data:
            role_fk_data = patient_or_admin.objects.all()
            user_register_fk_ = user_register.objects.all()
            user_role_data = user_role_management.objects.all()

            serializer_role = PatientOrAdminSerializer(role_fk_data, many=True)
            serializer_user = UserRegisterSerializer(user_register_fk_, many=True)
            serializer_user_role = UserRoleManagementSerializer(user_role_data, many=True)

            response_data = {
                "user_role_data": serializer_user_role.data,
                "user_fk": serializer_user.data,
                "role_fk": serializer_role.data,
            }
            return Response(response_data)
        else:
            return Response({"detail": "User not authenticated"}, status=401)
        
class UserRoleStoreViewSet(viewsets.ViewSet):
    def create(self, request):
        try:
            role_fk = request.data.get('role_fk') 
            user_fk = request.data.get('user_fk') 

            role_user_model = user_role_management()
            role_user_model.select_role_id = role_fk
            role_user_model.select_user_id = user_fk      
            role_user_model.save()

            messages.success(request, 'Data has been inserted successfully')
            return Response({"detail": "Data has been inserted successfully"})
        except IntegrityError:
            messages.error(request, 'IntegrityError: Duplicate entry')
            return Response({"detail": "IntegrityError: Duplicate entry"}, status=400)
        
class UserRoleDeleteViewSet(viewsets.ViewSet):
    def destroy(self, request, pk):
        try:
            data = get_object_or_404(user_role_management, id=pk)
            data.delete()
            messages.success(request, 'Data name has been deleted successfully')
            return Response({"detail": "Data name has been deleted successfully"})
        except IntegrityError:
            messages.error(request, 'IntegrityError: Unable to delete data')
            return Response({"detail": "IntegrityError: Unable to delete data"}, status=400)