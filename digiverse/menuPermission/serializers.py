from rest_framework import serializers
from .models import Menu, Submenu, MenuPermission
from user_role.models import UserRole

class SubmenuSerializer(serializers.ModelSerializer):
    menu = serializers.PrimaryKeyRelatedField(queryset=Menu.objects.all())
    submenu_id = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = Submenu
        fields = ['submenu_name', 'submenu_url', 'menu', 'submenu_id']


class MenuSerializer(serializers.ModelSerializer):
    submenus = SubmenuSerializer(many=True, read_only=True)
    
    class Meta:
        model = Menu
        fields = ['id', 'menu_name', 'menu_url', 'menu_icon', 'submenus']
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation

    def create(self, validated_data):
        # Construct menu_url based on menu_name
        menu_name = validated_data.get('menu_name')
        validated_data['menu_url'] = f"http://localhost:5173/admin/{menu_name.lower().replace(' ', '_')}/"

        # Handle submenus
        submenus_data = validated_data.pop('submenus', [])  # Get the submenu data from validated_data
        menu_instance = Menu.objects.create(**validated_data)  # Create the menu instance

        # Create and associate submenus with the menu instance
        for submenu_data in submenus_data:
            submenu_name = submenu_data.get('submenu_name')
            submenu_url = f"http://localhost:5173/admin/{submenu_name.lower().replace(' ', '_')}/"
            submenu_instance = Submenu.objects.create(submenu_name=submenu_name, submenu_url=submenu_url, menu=menu_instance)

        return menu_instance

class MenuPermissionSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = MenuPermission
        fields = ['id', 'role', 'menus', 'submenus', 'menu_permission']

    
# class MenuItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MenuItem
#         fields = ['name', 'can_view', 'can_edit', 'can_delete']

# class MenuSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Menu
#         fields = ['id', 'menu_name', 'submenu_status', 'menu_url', 'submenu_name', 'submenu_urls', 'menu_icon']