from rest_framework import viewsets
from .models import PrivacyPolicy
from .serializers import PrivacyPolicySerializer

class PrivacyPolicyViewSet(viewsets.ModelViewSet):
    queryset = PrivacyPolicy.objects.all()
    serializer_class = PrivacyPolicySerializer

