# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserRolePanelViewSet, UserRoleStoreViewSet, UserRoleDeleteViewSet

router = DefaultRouter()
router.register(r'user-role', UserRolePanelViewSet, basename='user-role')
router.register(r'user-role-store', UserRoleStoreViewSet, basename='user-role-store')
router.register(r'user-role-delete', UserRoleDeleteViewSet, basename='user-role-delete')

urlpatterns = [
    path('user-role-management/', include(router.urls)),
    # Your other URL patterns...
]
