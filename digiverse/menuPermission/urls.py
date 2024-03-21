from django.urls import path
from .views import MenuListCreateAPIView, MenuRetrieveUpdateDestroyAPIView, MenuPermissionCreateAPIView, SubmenuCreateAPIView, MenuPermissionListCreateAPIView, MenuPermissionRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('menus/', MenuListCreateAPIView.as_view(), name='menu-list-create'),
    path('menus/<int:pk>/', MenuRetrieveUpdateDestroyAPIView.as_view(), name='menu-detail'),
    path('menu-permission/create/', MenuPermissionCreateAPIView.as_view(), name='menu_permission_create'),
    path('menu-permissions/', MenuPermissionListCreateAPIView.as_view(), name='menu_permission_list_create'),
    path('menu-permissions/<int:pk>/', MenuPermissionRetrieveUpdateDestroyAPIView.as_view(), name='menu_permission_retrieve_update_destroy'),
    path('submenus/create/', SubmenuCreateAPIView.as_view(), name='submenu-create'),
]
    
    # path('menuitems/', MenuItemListCreateAPIView.as_view(), name='menuitem-list-create'),
    # path('menuitems/<int:pk>/', MenuItemRetrieveUpdateDestroyAPIView.as_view(), name='menuitem-detail'),

    
