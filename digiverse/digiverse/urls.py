
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
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
    path('auth_user/', include('auth_user.urls')),
    path('dashboard-form/', include('dashboard_from.urls')),
    path('user-role/', include('user_role.urls')),
    # path('token-manager/', include('token_manager.urls')),
    # path('prediction/', include('prediction.urls')),
    

    
]
