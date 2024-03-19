from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied
from .models import MenuPermission

class CustomPermission(BasePermission):
    
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            raise PermissionDenied("User is not authenticated")
        
        try: 
            # Retrieve MenuPermission object for the user's role
            if not hasattr(request.user, 'cached_menu_permission'):
                request.user.cached_menu_permission = MenuPermission.objects.get(role=request.user.role)
            menu_permission = request.user.cached_menu_permission
        except MenuPermission.DoesNotExist:
            raise PermissionDenied("No MenuPermission found for the user's role")
        
        # Custom permission logic based on the action
        if view.action == 'view_menu':
            if not menu_permission.can_view:
                raise PermissionDenied("User does not have permission to view menu")
        
        return True  # Allow other actions by default
