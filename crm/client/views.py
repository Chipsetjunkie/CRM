from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from .serializers import ClientSerializer
from api import models


class ClientView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """ Create Client Data """
    queryset = models.Client
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]


class accessClientView(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                       mixins.DestroyModelMixin, viewsets.GenericViewSet,
                       mixins.UpdateModelMixin):
    """ Create Client Data """
    queryset = models.Client
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        employee = models.Client.objects.filter(created_by=self.request.user.profile)
        return employee
