from rest_framework import viewsets
from .models import TermsOfUse
from .serializers import TermsOfUseSerializer

class TermsOfUseViewSet(viewsets.ModelViewSet):
    queryset = TermsOfUse.objects.all()
    serializer_class = TermsOfUseSerializer
