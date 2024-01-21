from django.urls import path
from .views import UserRolePanelView, UserRoleStoreAPIView, UserRoleDeleteAPIView

urlpatterns = [
    path('user-role-panel/', UserRolePanelView.as_view(), name='user-role-panel'),
    path('user-role-store/', UserRoleStoreAPIView.as_view(), name='user_role_store_api'),
    path('user-role-delete/<int:id>/', UserRoleDeleteAPIView.as_view(), name='user_role_delete'),
]
