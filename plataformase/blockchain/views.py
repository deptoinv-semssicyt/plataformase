from django.shortcuts import render

# Create your views here.
def index(request, id):
    return render(request, 'frontend/index.html', {'id': id})

def verificar(request):
    return render(request, 'frontend/index.html')
