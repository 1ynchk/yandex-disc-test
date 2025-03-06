from django.urls import path 

from .views import (
    registration,
    login,
    logout,
    login_check
)

urlpatterns = [
    path('registration/', registration, name='registration'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('login/check/', login_check, name='login_check')
]