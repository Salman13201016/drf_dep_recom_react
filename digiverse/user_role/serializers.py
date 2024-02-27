# serializers.py
from rest_framework import serializers
from .models import user_role_management
from role.serializers import PatientOrAdminSerializer  # Import the PatientOrAdminSerializer
from auth_user.serializers import SignUpSerializer  # Import the UserRegisterSerializer
from role.models import UserRole


# class UserRoleSerializer(serializers.ModelSerializer):
#     user_fname = serializers.SerializerMethodField()

#     class Meta:
#         model = UserRole
#         fields = ['id', 'user_fname']  # Include other fields if needed

#     def get_user_fname(self, obj):
#         return obj.user.fname if obj.user else None
    
class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_role_management
        fields = ['id', 'select_role', 'select_user']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user = instance.select_user
        role = instance.select_role

        if user:
            representation['user_name'] = {
                'id': user.id,
                'fname': user.fname,
                # Add any other user attributes you want to include
            }

        if role:
            representation['role'] = {
                'id': role.id,
                'role': role.role,
                # Add any other role attributes you want to include
            }

        return representation

    


class UserRoleDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_role_management
        fields = '_all_'

class UserRolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_role_management
        fields = '_all_'