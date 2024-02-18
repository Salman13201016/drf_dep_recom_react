from rest_framework import permissions

class MenuPermission(permissions.BasePermission):
    """
    Custom permission to check if the user has access to a particular menu.
    """

    def has_permission(self, request, view):
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return False

        # Get the user's role
        user_role = request.user.role  # Assuming you have a 'role' attribute in your user model

        # Check if the user's role has permission to access the requested menu
        # Implement your custom logic here based on the user's role and menu permissions
        # For example:
        if user_role == 'Admin':
            # Admin has access to all menus
            return True
        elif user_role == 'Subadmin':
            # Check if the requested menu is allowed for Subadmin
            # Implement your logic here
            return True  # Return True if allowed, False otherwise
        elif user_role == 'Staff':
            # Check if the requested menu is allowed for Staff
            # Implement your logic here
            return True  # Return True if allowed, False otherwise
        elif user_role == 'user':

            return True

        # If the user's role is not recognized or if no permission is granted, deny access
        return False
