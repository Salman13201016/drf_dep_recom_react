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

class MenuPermissionViewSet(viewsets.ModelViewSet):
    queryset  = MenuPermission.objects.all()
    serializer_class = MenuPermissionSerializer

