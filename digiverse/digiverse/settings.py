#Session

from pathlib import Path
import os
from datetime import timedelta
from django.conf import settings

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
temp_dir = os.path.join(BASE_DIR,'templates')
static_dir = os.path.join(BASE_DIR,'static')

SECRET_KEY = 'django-insecure-8q=zu#^b2w$xso(^$e)3bckrx1#96t*xlng@g-c01-7%r*el(m'

DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

# APPEND_SLASH = False
# # Application definition
AUTHENTICATION_BACKENDS = [
    'auth_user.authentication.EmailAuthBackend',
    'django.contrib.auth.backends.ModelBackend',
    # Other authentication backends
]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    'rest_framework',
    'rest_framework.authtoken',
    'user',
    'role',
    'user_role', 
    'divisions',
    'districts',
    'stations',
    'hospital_categories',
    'hospitals',
    'hospital_map_app',
    'department',
    'disease',
    'symptom',
    'corsheaders',
    'dashboard_from',
    'auth_user',
    # 'prediction',
    'static',
    'social_django',
    'address', 
    'django_filters',
    'dj_rest_auth',
    'privacy_policy',
    'permissions', 
    # 'menuPermission',
   
    

    
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'social_django.middleware.SocialAuthExceptionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    

    
]

ROOT_URLCONF = "digiverse.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [temp_dir],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',
            ],
        },
    },
]
STATICFILES_DIRS = [static_dir,]

WSGI_APPLICATION = "digiverse.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'digiverse',
        'USER': 'postgres',
        'PASSWORD': 'nirban@007',
        'HOST': 'localhost',  # or the hostname where your MySQL server is running

    }
}
MIDDLEWARE = [
    # ... other middleware ...

    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',

    # ... other middleware ...
]


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=365) if ['DEBUG'] == '1' else timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=365),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication',
    ),
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend']
}
REST_AUTH = {
    'USE_JWT': True,
    'JWT_AUTH_HTTPONLY' : False,
    'PASSWORD_RESET_USE_SITES_DOMAIN' : True,
    'OLD_PASSWORD_FIELD_ENABLED': True,
}



# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATICFILES_DIRS  = [static_dir,]
STATIC_URL = '/static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR/'media/'
LOGIN_URL = 'prediction_panel'
STATIC_ROOT = 'staticfiles'

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '229553171688-v842vpaunkrkch4ala37q5fep5errq5c.apps.googleusercontent.com'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = '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'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

CSRF_FAILURE_VIEW = 'auth_user.views.csrf_failure_view'



CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
]

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'nirbanmitra007@gmail.com'
EMAIL_HOST_PASSWORD = 'lsyz hlle sggs cghm' 
DEFAULT_FROM_EMAIL = 'nirbanmitra007@gmail.com' 
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

AUTHENTICATION_BACKENDS = [
    'social_core.backends.google.GoogleOAuth2',  # Google authentication backend
    'django.contrib.auth.backends.ModelBackend',  # Default Django authentication backend
    # Add other authentication backends as needed
]

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '229553171688-v842vpaunkrkch4ala37q5fep5errq5c.apps.googleusercontent.com'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = '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'
SOCIAL_AUTH_PIPELINE = (
    # ... other pipeline steps ...
    'dashboard_from.pipeline.capture_social_auth_data',  # Add this line
    # ... other pipeline steps ...
)