import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

YANDEX_API_BASE = "https://cloud-api.yandex.net/v1/disk/public/resources"

@api_view(["GET"])
def get_yandex_files(request):
    '''Получение файлов с публичной ссылки'''
    
    public_key = request.GET.get('public_key')
    
    if not public_key:
        return Response(
            {
                'status': 'error', 
                'comment': 'public_key is required'
            }, 
            status=400
            )

    params = {'public_key': public_key}
    response = requests.get(YANDEX_API_BASE, params=params)

    if response.status_code == 200:
        return Response(response.json())
    else:
        return Response(
            {
                'status': 'error',
                'comment': response.data.get('message')
            }, 
            status=response.status_code
        )