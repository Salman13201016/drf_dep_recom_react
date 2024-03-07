from rest_framework import serializers
from .models import Menu, Submenu, MenuPermission
from django import forms
from django.forms.widgets import CheckboxSelectMultiple

class SubmenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submenu
        fields = ['id', 'submenu_name', 'url']

class MenuSerializer(serializers.ModelSerializer):
    submenus = SubmenuSerializer(many=True, read_only=True)
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



    # def create(self, validated_data):
    #     # Set menu_url to None if submenu_status is True
    #     if validated_data.get('submenu_status', False):
    #         validated_data['menu_url'] = None
    #     return super().create(validated_data)

    # def update(self, instance, validated_data):
    #     # Set menu_url to None if submenu_status is True
    #     if validated_data.get('submenu_status', instance.submenu_status):
    #         validated_data['menu_url'] = None
    #     return super().update(instance, validated_data)

from user_role.models import UserRole
class MenuPermissionSerializer(serializers.ModelSerializer):
    role_name = serializers.CharField(source='role.role', read_only=True)
    menu = serializers.SerializerMethodField()

    class Meta:
        model = MenuPermission
        fields = ['id', 'role', 'role_name', 'menu']

    def get_menu(self, obj):
        menus = obj.menu.all()
        menu_data = []
        for menu in menus:
            if menu.menu_name == 'Hospital Location':
                submenus_data = [
                    {"name": "Division", "can_view": True},  # Assuming Division has can_view permission
                    {"name": "District", "can_view": True},  # Assuming District has can_view permission
                    {"name": "Station", "can_view": True},  # Assuming Station has can_view permission
                ]
                menu_data.append({
                    'id': menu.id,
                    'menu_name': menu.menu_name,
                    'submenus': submenus_data
                })
            else:
                menu_serializer = MenuSerializer(menu)
                menu_data.append(menu_serializer.data)
        return menu_data





