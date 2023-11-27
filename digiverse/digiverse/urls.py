
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("role/", include('role.urls')),
    path('division/', include('divisions.urls')),
    path('district/', include('districts.urls')), 
    path('station/', include('stations.urls')),
    path('hospital_category/', include('hospital_categories.urls')),
]
