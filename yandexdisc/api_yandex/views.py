import requests
import os
import dotenv
import urllib.parse
from rest_framework.decorators import api_view
from rest_framework.response import Response

dotenv.load_dotenv()

YANDEX_API_BASE_GET_LIST = 'https://cloud-api.yandex.net/v1/disk/public/resources'
YANDEX_API_BASE_GET_LINK = 'https://cloud-api.yandex.net/v1/disk/public/resources/download'

@api_view(['GET'])
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
    response = requests.get(YANDEX_API_BASE_GET_LIST, params=params)

    data = response.json()

    if response.status_code == 200:
        return Response(data)
    else:
        return Response(data, status=response.status_code)

@api_view(['GET'])
def get_yandex_download_link(request):
    """Получение ссылки для скачивания публичного файла с Яндекс.Диска."""
    
    file_path = request.GET.get('path')
    public_key = request.GET.get('public_key')
    
    if not file_path or not public_key:
        return Response({'error': 'Укажите path и public_key в параметрах запроса'}, status=400)

    encoded_path = urllib.parse.unquote_plus(file_path)  
    encoded_key = urllib.parse.quote_plus(public_key)
    
    params = {
        'path': encoded_path,
        'public_key': encoded_key
    }

    response = requests.get(YANDEX_API_BASE_GET_LINK, params=params)
    data = response.json()

    if response.status_code == 200 and 'href' in data:
        return Response({'download_url': data['href'], 'name': file_path.replace('/', '')})
    else:
        return Response(data, status=response.status_code)