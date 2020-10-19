from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from .serializers import ClientSerializer,ClientGetSerializer,\
                         notesSerializer,filesSerializer,\
                         orderSerializer
from api import models


class ClientView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """ Create Client Data """
    queryset = models.Client
    serializer_class = ClientSerializer
    permission_classes = []


class accessClientView(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                       mixins.DestroyModelMixin, viewsets.GenericViewSet,
                       mixins.UpdateModelMixin):
    """ Create Client Data """
    queryset = models.Client
    serializer_class = ClientGetSerializer
    permission_classes = []

    def get_queryset(self):
        employee = models.Client.objects.filter(created_by=self.request.user.profile)
        return employee


class createNoteView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """ Creates notes """
    serializer_class = notesSerializer
    queryset = models.Notes.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        notes = models.Notes.objects.filter(created_by=self.request.user.profile).order_by('-id')
        return notes


class createOrderView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """ Creates notes """
    serializer_class = orderSerializer
    queryset = models.Order.objects.all()
    permission_classes = [IsAuthenticated]



class createFileView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """ Creates notes """
    serializer_class = filesSerializer
    queryset = models.Files.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        files = models.Files.objects.filter(created_by=self.request.user.profile).order_by('-id')
        return files


class accessNoteView(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                     mixins.DestroyModelMixin, viewsets.GenericViewSet):
        serializer_class = notesSerializer
        permission_classes = [IsAuthenticated]

        def get_queryset(self):
            noteslist = models.Notes.objects.filter(created_by=self.request.user.profile).order_by("-id")
            return noteslist


class accessOrderView(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                     mixins.DestroyModelMixin, viewsets.GenericViewSet):
        serializer_class = orderSerializer
        permission_classes = [IsAuthenticated]

        def get_queryset(self):
            orderlist = models.Order.objects.filter(created_by=self.request.user.profile).order_by("-id")
            return orderlist


class accessFileView(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                     mixins.DestroyModelMixin, viewsets.GenericViewSet):
        serializer_class = filesSerializer
        permission_classes = [IsAuthenticated]

        def get_queryset(self):
            filelist = models.Files.objects.filter(owner=self.request.user.profile).order_by("-id")
            return filelist
