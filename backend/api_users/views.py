from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Users

# Create your views here.
@api_view(['POST'])
def registration(request): 
    '''Регистрация пользователя'''
    
    email = request.data.get('email')
    password = request.data.get('password')
    
    try:
        Users.objects.get(email=email)
    except Exception:
        name = request.data.get('name')
        surname = request.data.get('password')

        user = Users(email=email, first_name=name, last_name=surname)
        user.set_password(password)
        user.save()
        return Response({'status': 'ok', 'comment': 'success'})
    return Response({'status': 'error', 'comment': 'such user has already been registred'}, status=400)
        
@api_view(['GET'])
def login_check(request): 
    '''Проверка на авторизацию'''
    
    if request.user.is_authenticated: 
        try:
            user = Users.objects.get(id=request.user.id)
        except Exception:
            return Response({'status': 'error', 'comment': 'there is not such a user'}, status=401)
        return Response({'auth': True, 'name': f'{user.first_name} {user.last_name}'})
    return Response({'auth': False})

@api_view(['POST'])
def user_login(request): 
    '''Авторизация пользователя'''
    
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, email=email, password=password)
    if user is not None: 
        login(request, user)
        response = Response({'status': 'ok', 'comment': 'success'}) 
        return response 
    else:
        return Response({'status': 'error', 'comment': 'there is not such a user'}, status=401) 
    
@api_view(['POST'])
def user_logout(request):
    '''Выход из аккаунта пользователя'''
    
    logout(request)
    return Response({'status': 'ok', 'comment': 'success'})