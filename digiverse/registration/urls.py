# registration/urls.py
from django.urls import path
from .views import register, email_verification

urlpatterns = [
    path('register/', register, name='register'),
    path('email-verification/<int:user_id>/', email_verification, name='email_verification'),
]
