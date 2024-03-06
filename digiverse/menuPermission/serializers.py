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
    role_name = serializers.SerializerMethodField()
    menu_names = serializers.SerializerMethodField()
    submenu_names = serializers.SerializerMethodField()

    class Meta:
        model = MenuPermission
        fields = ['id', 'role', 'role_name', 'menu', 'menu_names', 'submenu_names']

    def get_role_name(self, obj):
        return obj.role.role if obj.role else None

    def get_menu_names(self, obj):
        return [menu.menu_name for menu in obj.menu.all()]

    def get_submenu_names(self, obj):
        submenu_names = []
        for menu in obj.menu.all():
            submenu_names.extend(menu.submenu_name.split(','))
        return submenu_names


