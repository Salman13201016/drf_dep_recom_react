from rest_framework.permissions import BasePermission
from .models import MenuPermission
from django.core.exceptions import ObjectDoesNotExist

class CustomPermission(BasePermission):
    
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        try: 
            # Retrieve MenuPermission object for the user's role
            menu_permission = MenuPermission.objects.get(role=request.user.role)
        except MenuPermission.DoesNotExist:
            return False  # No MenuPermission found for the user's role
        
        
        # Custom permission logic based on the action
        if view.action == 'view_menu':
            return menu_permission.can_view
        elif view.action == 'create_menu':
            return menu_permission.can_insert
        elif view.action == 'update_menu':
            return menu_permission.can_edit
        elif view.action == 'delete_menu':
            return menu_permission.can_delete
        
        return True  # Allow other actions by default
