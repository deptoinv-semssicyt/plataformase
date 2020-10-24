from rest_framework import serializers
from .models import Lead, estampados, ArchivosSinodales

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ('id', 'name', 'email', 'message')

class estampadosSerializer(serializers.ModelSerializer):
    class Meta:
        model = estampados
        fields = ('id', 'nombre', 'descripcion', 'hashInfura', 'hash', 'blockHash', 'blockNumber', 'solicitud', 'userReg')

class ArchivosSinodalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchivosSinodales
        fields = ('id', 'sinodal', 'curriculum', 'cedula', 'solicitud')
