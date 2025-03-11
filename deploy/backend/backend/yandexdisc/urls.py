from django.contrib import admin
from django.urls import path, include

from api_users.urls import urlpatterns as users_patterns
from api_yandex.urls import urlpatterns as yandex_patterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api_users/', include(users_patterns)),
    path('api_yandex/', include(yandex_patterns)) 
]
