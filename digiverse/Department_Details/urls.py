from django.contrib import admin
from django.urls import path
from . import views as dep_details


urlpatterns = [  
    path('', dep_details.dep_det_panel,name='dep_details'),
    path('dep_det_store/', dep_details.depart_det_store,name='dep_details_store'),
    
]