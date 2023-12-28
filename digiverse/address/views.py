# views.py
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import address_name
from .serializers import AddressSerializer
from django.db import IntegrityError

class AddressListCreateView(generics.ListCreateAPIView):
    queryset = address_name.objects.all()
    serializer_class = AddressSerializer

    # def list(self, request, *args, **kwargs):
    #     if 'user_id' not in self.request.session:
    #         return Response({"error": "Authentication required."}, status=status.HTTP_401_UNAUTHORIZED)
    #     return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except IntegrityError:
            return Response({'message': 'The Address name already exists'}, status=status.HTTP_400_BAD_REQUEST)
