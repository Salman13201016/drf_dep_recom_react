
from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user has admin role
        return request.user.role == 'admin'

class IsSubadminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user has subadmin role
        return request.user.role == 'subadmin'

class IsStaffUser(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user has staff role
        return request.user.role == 'staff'
