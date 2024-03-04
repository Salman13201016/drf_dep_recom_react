from rest_framework import serializers
from .models import Menu, Submenu, MenuPermission
from django import forms
from django.forms.widgets import CheckboxSelectMultiple

class SubmenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submenu
        fields = ['url']

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'
        
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


class MenuPermissionSerializer(serializers.ModelSerializer):
    menu = serializers.PrimaryKeyRelatedField(queryset=Menu.objects.all(), many=True)

    class Meta:
        model = MenuPermission
        fields = ['id', 'role', 'menu']

    def create(self, validated_data):
        menu_name = validated_data.pop('menu', None)  # Extract menu name
        permission = MenuPermission.objects.create(**validated_data)

        if menu_name:
            # Retrieve the Menu instance by name
            menu = Menu.objects.filter(menu_name=menu_name).first()
            if menu:
                permission.menu = menu
                permission.save()
            else:
                print('Nothing')

        return permission
