from django.db import models
from django.contrib.auth.models import AbstractUser
from django_ulid.models import default, ULIDField

class Users(AbstractUser): 
   
    id = ULIDField(default=default, primary_key=True, editable=False) 
    email = models.EmailField(unique=True)
    username = models.CharField(unique=False)
     
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self): 
        return self.email