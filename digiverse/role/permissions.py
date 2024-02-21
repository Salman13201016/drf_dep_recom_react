from rest_framework import BasePermission

from .models import CRUDPermission
class CustomPermission(BasePermission):
    
    def has_permission(self, request, view):
        if not request.user.is_authenticated:  # Check if user is authenticated
            return False
        
        try: 
            # Retrieve CRUDPermission object for the user's role
            crud_permission = CRUDPermission.objects.get(role=request.user.role)
        except CRUDPermission.DoesNotExist:
            return False  # No permission found for the user's role
        
        # Custom permission logic based on the action
        if view.action == 'create':
            return crud_permission.insert
        elif view.action == 'retrieve':
            return crud_permission.view
        elif view.action == 'update':
            return crud_permission.edit
        elif view.action == 'destroy':
            return crud_permission.delete
        
        return True  # Allow other actions by default
        