
from django.contrib import admin
from django.urls import path,include
# from auth_user.views import EmailVerificationView
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
    path('address/', include('address.urls')),
    # path('prediction/', include('prediction.urls')),
    path('user_role/', include('user_role.urls')),
    path('privacy/', include('privacy_policy.urls')),
    path('role_permission/', include('permissions.urls')),
    # path('menu_permission/', include('menuPermission.urls')),
   
    

    
]
