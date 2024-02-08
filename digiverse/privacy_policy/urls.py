# privacy_policy/urls.py
from django.urls import path
from .views import PrivacyPolicyViewSet

urlpatterns = [
    path('privacy_policy/', PrivacyPolicyViewSet.as_view({'post': 'create', 'get': 'list'}), name = 'privacy-policy'),
    # Add other privacy policy-related URLs here if needed
]

