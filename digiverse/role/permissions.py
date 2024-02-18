from rest_framework import permissions
from rest_framework import viewsets
from .models import UserRole, CRUDPermission, MenuPermission
from .serializers import PatientOrAdminSerializer, CRUDPermissionSerializer, MenuPermissionSerializer
class CustomPermission(permissions.BasePermission):
    """
    Custom permission to check if the user has the necessary permissions.
    """

    def has_permission(self, request, view):
        # Check if the user has the necessary permissions to perform the action
        # You can implement your custom logic here based on the request and user roles
        # For example, check if the user is an admin or has specific permissions
        # Return True if the user has permission, False otherwise
        return request.user.is_authenticated and request.user.has_perm('your_app.can_perform_action')


class RoleViewSet(viewsets.ModelViewSet):
    queryset = UserRole.objects.all()
    serializer_class = PatientOrAdminSerializer
    permission_classes = [CustomPermission]


class CRUDPermissionViewSet(viewsets.ModelViewSet):
    queryset = CRUDPermission.objects.all()
    serializer_class = CRUDPermissionSerializer
    lookup_field = 'id'
    permission_classes = [CustomPermission]


class MenuPermissionViewSet(viewsets.ModelViewSet):
    queryset = MenuPermission.objects.all()
    serializer_class = MenuPermissionSerializer
    permission_classes = [CustomPermission]
