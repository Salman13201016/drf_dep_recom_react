from django.urls import path
from .views import UserRolePanelView, UserRoleStoreAPIView, UserRoleDeleteAPIView, GetUserRolesAPIView

urlpatterns = [
    path('user-role-panel/', UserRolePanelView.as_view(), name='user-role-panel'),
    path('user-role-store/', UserRoleStoreAPIView.as_view(), name='user_role_store_api'),
    path('user-role-delete/<int:id>/', UserRoleDeleteAPIView.as_view(), name='user_role_delete'),
    path('get-user-roles/', GetUserRolesAPIView.as_view(), name='get_user_roles_api'), 
]
