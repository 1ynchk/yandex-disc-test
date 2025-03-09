from django.urls import path 

from .views import (
    registration,
    user_login,
    user_logout,
    login_check
)

urlpatterns = [
    path('registration/', registration, name='registration'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('login/check/', login_check, name='login_check')
]