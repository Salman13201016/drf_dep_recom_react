# permissions/urls.py

from django.urls import path
from . import views

app_name = 'permissions'

urlpatterns = [
    path('user_track/', views.UserTrackView.as_view(), name='user-track'),
    path('menu_permissions/', views.MenuPermissionView.as_view(), name='menu-permissions'),
]
