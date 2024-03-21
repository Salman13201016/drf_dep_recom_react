from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Menu, Submenu
from .serializers import MenuSerializer, MenuPermissionSerializer, SubmenuSerializer
from .permissions import MenuPermission

class MenuListCreateAPIView(generics.ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    # permission_classes = [MenuPermission]


class MenuRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    # permission_classes = [MenuPermission]

# Assuming your view is using a ViewSet

class MenuPermissionCreateAPIView(generics.CreateAPIView):
    queryset = MenuPermission.objects.all()
    serializer_class = MenuPermissionSerializer
    
class MenuPermissionListCreateAPIView(generics.ListCreateAPIView):
    queryset = MenuPermission.objects.all()
    serializer_class = MenuPermissionSerializer

class MenuPermissionRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MenuPermission.objects.all()
    serializer_class = MenuPermissionSerializer

class SubmenuCreateAPIView(generics.CreateAPIView):
    queryset = Submenu.objects.all()
    serializer_class = SubmenuSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Get the validated data
            validated_data = serializer.validated_data
            
            # Get the parent menu instance
            parent_menu = validated_data.get('menu')
            
            # Construct the submenu URLs based on the provided submenu names
            submenu_names = validated_data.get('submenu_name').split(', ')
            submenu_instances = []
            for name in submenu_names:
                # Construct the submenu URL without the parent menu part
                submenu_url = f"http://localhost:5173/admin/{name.lower().replace(' ', '_')}/"
                submenu_instance = Submenu.objects.create(submenu_name=name, submenu_url=submenu_url, menu=parent_menu)
                submenu_instances.append(submenu_instance)
            
            # Serialize the created submenu instances with their IDs
            serialized_submenus = SubmenuSerializer(submenu_instances, many=True)
            return Response(serialized_submenus.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)







    
# class MenuItemListCreateAPIView(generics.ListCreateAPIView):
#     queryset = MenuItem.objects.all()
#     serializer_class = MenuItemSerializer

# class MenuItemRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = MenuItem.objects.all()
#     serializer_class = MenuItemSerializer

# class MenuItemListView(generics.ListAPIView):
#     queryset = MenuItem.objects.filter(menu_type='menu')
#     serializer_class = MenuItemListSerializer