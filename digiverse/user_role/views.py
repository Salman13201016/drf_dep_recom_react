# views.py
from rest_framework import generics, status
from rest_framework.response import Response
from .models import user_role_management
from .serializers import UserRoleSerializer, UserRoleSerializer, UserRoleDeleteSerializer, UserRolesSerializer
from django.shortcuts import redirect
from rest_framework.views import APIView
from django.db import IntegrityError
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib import messages


class UserRolePanelView(generics.ListAPIView):
    serializer_class = UserRoleSerializer

    def get_queryset(self):
        google_data = self.request.session.get('social_auth_google-oauth2')
        
        if 'user_id' in self.request.session or google_data:
            return user_role_management.objects.all()
        else:
            return user_role_management.objects.none()

    def get(self, request, *args, **kwargs):
        google_data = self.request.session.get('social_auth_google-oauth2')
        print(google_data)
        queryset = self.get_queryset()
        
        print("Queryset: ", queryset)
        
        serializer = self.serializer_class(queryset, many=True)
        print("Serializers: ", serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserRoleStoreAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            role_fk = request.data.get('role_fk') 
            user_fk = request.data.get('user_fk') 
            
            role_user_model = user_role_management()
            role_user_model.select_role_id = role_fk
            role_user_model.select_user_id = user_fk
            role_user_model.save()
            
            serializer = UserRoleSerializer(role_user_model)  # Serialize the saved instance
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            return Response({'detail': 'Data has not been inserted successfully'}, status=status.HTTP_400_BAD_REQUEST)

class UserRoleDeleteAPIView(APIView):
    def delete(self, request, id, *args, **kwargs):
        try:
            data = get_object_or_404(user_role_management, id=id)
            data.delete()
            messages.success(request, 'Data name has been deleted successfully')
            return Response({'detail': 'Data name has been deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except IntegrityError as e: 
            messages.error(request, 'Data name has not been deleted successfully')
            return Response({'detail': 'Data name has not been deleted successfully'}, status=status.HTTP_400_BAD_REQUEST)
        
class GetUserRolesAPIView(generics.ListAPIView):
    queryset = user_role_management.objects.all()
    serializer_class = UserRolesSerializer