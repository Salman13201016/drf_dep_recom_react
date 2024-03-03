from rest_framework import serializers
from .models import Menu, Submenu

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

