from django.contrib import admin
from django.urls import path
from . import views as address


urlpatterns = [  
    # path('', address.name_panel,name='addr'),
    path('', address.address_panel,name='address'),
    path('station_store/', address.address_store,name='address_store'),
    
]