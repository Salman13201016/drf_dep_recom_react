
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("role/", include('role.urls')),
    path('division/', include('divisions.urls')),
    path('district/', include('districts.urls')), 
    path('station/', include('stations.urls')),
    path('hospital_category/', include('hospital_categories.urls')),
    path('hospital/', include('hospitals.urls')),
    path('hospital-map-app/', include('hospital_map_app.urls')),
    path('departments/', include('department.urls')),
    path('diseases/', include('disease.urls')),
    path('symptoms/', include('symptom.urls')),
    path('registration/', include('registration.urls')),
    
]
