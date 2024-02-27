from rest_framework import serializers
from .models import Menu

class MenuSerializer(serializers.ModelSerializer):
    submenu_urls = serializers.SerializerMethodField()

    class Meta:
        model = Menu
        fields = ['id', 'menu_name', 'submenu_status', 'menu_url', 'submenu_name', 'menu_icon', 'submenu_urls']

    def get_submenu_urls(self, obj):
        submenu_urls = []
        submenus = obj.submenu.all()  # Assuming submenu is the related field name
        for submenu in submenus:
            submenu_urls.append(submenu.url)  # Replace 'url' with the actual field name containing the URL
        return submenu_urls



