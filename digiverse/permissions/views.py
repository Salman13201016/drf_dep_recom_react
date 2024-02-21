# permissions/views.py

from rest_framework import viewsets
from .models import Role, Menu, Permission
from .serializers import RoleSerializer, MenuSerializer, PermissionSerializer
from .permission_logic import RoleBasedPermission
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime  # Import datetime module
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
# permissions/views.py
from user_role.models import user_role_management
from rest_framework.views import APIView
from rest_framework.response import Response

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [RoleBasedPermission]

class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [RoleBasedPermission]

class MenuPermissionView(APIView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    permission_classes = [RoleBasedPermission]



class UserTrackView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Retrieve the first name of the authenticated user
        first_name = request.user.first_name

        # Get user activity details
        user_activity = {
            'first_name': first_name,
            'ip_address': request.META.get('REMOTE_ADDR'),
            'user_agent': request.META.get('HTTP_USER_AGENT'),
            'time_of_access': str(timezone.now()),
            # Add more information as needed
            # 'user_role' : request.user_role_management.objects.get(select_user=user),  # Adjust the field name here
            # 'role_name' : request.user_role.select_role.role if user_role else "No Role Assigned"
        }

        # Return the user activity as a response
        return Response(user_activity)