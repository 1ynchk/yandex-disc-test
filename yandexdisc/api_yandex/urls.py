from django.urls import path

from .views import get_yandex_files

urlpatterns = [
    path('get_files/', get_yandex_files)    
]