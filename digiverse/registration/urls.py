# registration/urls.py
from django.urls import path
from .views import RegistrationViewSet

urlpatterns = [
     path('register/', RegistrationViewSet.as_view({'post': 'create', 'get': 'list'}), name='registration-list'),
    # path('email-verification/<int:user_id>/', email_verification, name='email_verification'),
]
