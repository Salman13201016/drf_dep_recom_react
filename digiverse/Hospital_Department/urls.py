from django.contrib import admin
from django.urls import path
from . import views as hos_depart


urlpatterns = [  
    path('', hos_depart.hospital_depart_panel,name='hospital_depart'),
    path('dep_det_store/', hos_depart.hospital_depart_store,name='hospital_depart_store'),
    
]