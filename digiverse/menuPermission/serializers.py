from rest_framework import serializers
from .models import Menu, Submenu, MenuPermission, MenuItem
from user_role.models import UserRole

class SubmenuPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submenu
        fields = '__all__'

class MenuSerializer(serializers.ModelSerializer):
    submenus = SubmenuPermissionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Menu
        fields = ['id', 'menu_name', 'submenu_status', 'menu_url', 'submenu_name', 'submenu_urls', 'menu_icon', 'submenus']
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.setdefault('submenu_urls', [])  # Ensure submenu_urls field exists
        return representation
    
    def create(self, validated_data):
        if validated_data.get('submenu_status', False):
            validated_data['menu_url'] = None
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        if validated_data.get('submenu_status', instance.submenu_status):
            validated_data['menu_url'] = None
        return super().update(instance, validated_data)

class MenuPermissionSerializer(serializers.ModelSerializer):
    role_name = serializers.SerializerMethodField()
    menu_details = serializers.SerializerMethodField()
    submenu_permissions = SubmenuPermissionSerializer(many=True, required=False)

    class Meta:
        model = MenuPermission
        fields = ['id', 'role', 'role_name', 'menu', 'menu_details', 'submenu_permissions']

    def get_role_name(self, obj):
        return obj.role.role if obj.role else None

    def get_menu_details(self, obj):
        menu_details = []
        for menu in obj.menu.all():
            submenu_names = menu.submenu_name.split(',') if menu.submenu_name else []
            menu_details.append({
                'menu_name': menu.menu_name,
                'submenus': submenu_names
            })
        return menu_details

    
class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ['name', 'can_view', 'can_edit', 'can_delete']

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['id', 'menu_name', 'submenu_status', 'menu_url', 'submenu_name', 'submenu_urls', 'menu_icon']
