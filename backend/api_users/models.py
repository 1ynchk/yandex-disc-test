from django.db import models
from django.contrib.auth.models import AbstractUser

class Users(AbstractUser): 
   
    email = models.EmailField(unique=True)
    username = models.CharField(unique=False, max_length=50)
     
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self): 
        return self.email