  
"""
Django settings for plataformase project.
Generated by 'django-admin startproject' using Django 3.0.3.
For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/
For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'qzsi@0hipda@da1y-#&^#p61t-jc5n(un8pe+7s3!-&4^*d&_v'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*','ssemssicyt.nayarit.gob.mx']


# Application definition

INSTALLED_APPS = [
    'visitante.apps.VisitanteConfig',
    'RVOES.apps.RvoesConfig',
    'login.apps.LoginConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'TBC',
    'SETyRS',
    'SigApp',
    'sweetify',
    'xlwt',
]
# STATICFILES_DIRS = (
#   os.path.join(BASE_DIR,"static"),
# )

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'plataformase.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.media',
            ],
        },
    },
]

WSGI_APPLICATION = 'plataformase.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases
if os.getenv('GAE_APPLICATION', None):
    # Running on production App Engine, so connect to Google Cloud SQL using
    # the unix socket at /cloudsql/<your-cloudsql-connection string>
    DATABASES = {
        'default': {
            'ENGINE'  : 'django.db.backends.postgresql_psycopg2',
            'HOST'    : '/cloudsql/plataformase:us-west2:plataforma',
            'USER'    : 'postgres',
            'PASSWORD': 'admin',
            'NAME'    : 'plataforma',
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE'   : 'django.db.backends.postgresql_psycopg2',
            #'NAME'     : 'plattform',
            'NAME'     : 'plataforma',
            'USER'     : 'postgres',
            #'PASSWORD' : 'diana',
            'PASSWORD' : 'admin',
            'HOST'     : 'localhost',
            'PORT'    : '5432',
            #'PORT'     : '3306',
        }
    }

#Conexión con   Proxy para cloud
#cloud_sql_proxy.exe -instances="plataformase:us-west2:plataforma"=tcp:3306


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

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


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'es-ES'

TIME_ZONE = 'America/Lima'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/


AUTH_USER_MODEL = 'login.CustomUser'

LOGIN_REDIRECT_URL = 'perfil'
LOGOUT_REDIRECT_URL = 'login'


# EMAIL_FILE_PATH = os.path.join(BASE_DIR, "sent_emails")

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'SETyRS/static'),
]

# Bucket de google cloud plattform 
 #https://storage.googleapis.com/plataformase.appspot.com/Archivos/MedSuperior/RVOE.pdf
if os.getenv('GAE_APPLICATION', None):
    DEFAULT_FILE_STORAGE = 'django_gcloud_storage.DjangoGCloudStorage'
    GCS_PROJECT = "plataformase"
    GCS_BUCKET = "plataformase.appspot.com"
    GCS_CREDENTIALS_FILE_PATH = "key.json"
    MEDIA_URL = 'https://storage.googleapis.com/{}/'.format(GCS_BUCKET)
    #MEDIA_URL = 'https://storage.cloud.google.com/{}/'.format(GCS_BUCKET)
else:
    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Configuración para uso de correo 
EMAIL_USE_TLS = True
EMAIL_HOST = 'outlook.office365.com'
#EMAIL_HOST = 'smtp.educacion.nayarit.gob.mx'
EMAIL_HOST_USER = 'plataforma.ssemssicyt@educacion.nayarit.gob.mx'
SERVER_EMAIL = EMAIL_HOST_USER
DEFAULT_FROM_EMAIL = 'plataforma.ssemssicyt@educacion.nayarit.gob.mx'
EMAIL_HOST_PASSWORD = '$Plat2020'
EMAIL_PORT = 587
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

