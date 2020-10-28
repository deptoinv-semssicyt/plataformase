from django.urls import path
from . import views

urlpatterns = [
    path('<int:id>', views.index, name='blockchain' ),
    path('/verificar', views.verificar, name='verificar' ),
]
