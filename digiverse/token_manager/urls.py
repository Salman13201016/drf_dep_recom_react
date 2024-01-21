# token_manager/urls.py
from django.urls import path
from .views import TokenObtainView

urlpatterns = [
    path('token/', TokenObtainView.as_view(), name='token_obtain'),
    # Add other URL patterns as needed
]
