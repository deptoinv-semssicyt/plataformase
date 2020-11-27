from django.shortcuts import render
from django.conf import settings

# your_media_root = settings.MEDIA_ROOT

# Create your views here.
def index(request, id):
    return render(request, 'frontend/index.html', { 'id': id, 'bucket':settings.MEDIA_ROOT })

def verificar(request):
    return render(request, 'frontend/index.html')
