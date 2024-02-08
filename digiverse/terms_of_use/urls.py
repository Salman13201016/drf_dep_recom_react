from django.urls import path
from .views import TermsOfUseViewSet

urlpatterns = [
    path('terms_of_use', TermsOfUseViewSet.as_view({'post': 'create', 'get': 'list'}), name='terms-of-use')
]