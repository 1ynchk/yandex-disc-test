from django.urls import path

from .views import get_yandex_files, get_yandex_download_link

urlpatterns = [
    path('get_files/', get_yandex_files),
    path('get_file_link/', get_yandex_download_link)
]