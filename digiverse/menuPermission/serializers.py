from rest_framework import serializers
from .models import Menu, Submenu

class SubmenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submenu
        fields = ['url']

class MenuSerializer(serializers.ModelSerializer):
    submenu_urls = SubmenuSerializer(many=True)

    class Meta:
        model = Menu
        fields = ['id', 'menu_name', 'submenu_status', 'menu_url', 'submenu_name', 'submenu_urls', 'menu_icon']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.setdefault('submenu_urls', [])
        return representation
