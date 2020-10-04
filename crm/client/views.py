from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from .serializers import ClientSerializer
from api import models

# Create your views here.
class ClientView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = models.Client
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]
