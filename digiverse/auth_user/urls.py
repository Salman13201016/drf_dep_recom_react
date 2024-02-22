from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserIndexPanelView,
    SignUpView,
    EmailVerificationView,
    LoginAuthView,
    LogoutAuthView,
    csrf_failure_view,
    AuthUserIndexView,
    TermsOfUseView,
    PrivacyPolicyView,
    UserEmailListView,
)

# Using DRF router for SignUpView
router = DefaultRouter()
router.register(r'signup', SignUpView, basename='signup')

urlpatterns = [
    path('user_index_panel/', UserIndexPanelView.as_view({'get': 'user_index_panel'}), name='user_index_panel'),
    path('email_verification/<str:v_key>/<str:fname>/', EmailVerificationView.as_view(), name='email_verification'),
    path('login_auth_panel/', LoginAuthView.as_view({'post': 'login_auth_panel'}), name='login_auth_panel'),
    path('logout_auth_panel/', LogoutAuthView.as_view({'post': 'logout_auth_panel'}), name='logout_auth_panel'),
    path('csrf_failure/', csrf_failure_view, name='csrf_failure'),
    path('auth_user_index/', AuthUserIndexView.as_view({'get': 'auth_user_index'}), name='auth_user_index'),
    path('terms_of_use/', TermsOfUseView.as_view({'get': 'terms_of_use'}), name='terms_of_use'),
    path('privacy_policy/', PrivacyPolicyView.as_view({'get': 'privacy_policy'}), name='privacy_policy'),
    path('user_emails/', UserEmailListView.as_view(), name='user_emails'),  # URL for user emails

    path('', include(router.urls)),  # Include SignUpView DRF router URLs
]
