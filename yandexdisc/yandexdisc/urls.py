from django.contrib import admin
from django.urls import path, include

from api_users.urls import urlpatterns as users_patterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api_users/', include(users_patterns)) 
]
