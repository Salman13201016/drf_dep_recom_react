from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Menu
from .serializers import MenuSerializer, MenuPermissionSerializer
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

class MenuPermissionViewSet(viewsets.ModelViewSet):
    queryset = MenuPermission.objects.all()
    serializer_class = MenuPermissionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
# class MenuItemListCreateAPIView(generics.ListCreateAPIView):
#     queryset = MenuItem.objects.all()
#     serializer_class = MenuItemSerializer

# class MenuItemRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = MenuItem.objects.all()
#     serializer_class = MenuItemSerializer

# class MenuItemListView(generics.ListAPIView):
#     queryset = MenuItem.objects.filter(menu_type='menu')
#     serializer_class = MenuItemListSerializer