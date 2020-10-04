from rest_framework import mixins, viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework import views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import profileSerilalizer, notesSerializer, assignmentSerializers, orderSerializer
from api import models

class EmployeeView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """ Creates employee """
    serializer_class = profileSerilalizer
    queryset = models.Profile.objects.all()
    permission_classes = [IsAuthenticated]


class createNoteView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """ Creates notes """
    serializer_class = notesSerializer
    queryset = models.Notes.objects.all()
    permission_classes = [IsAuthenticated]


class createAssignmentView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """ Creates assignment """
    serializer_class = assignmentSerializers
    queryset = models.Assignment.objects.all()
    permission_classes = [IsAuthenticated]


class createOrderView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """ Creates assignment """
    serializer_class = orderSerializer
    queryset = models.Order.objects.all()
    permission_classes = [IsAuthenticated]


class accessNoteView(mixins.ListModelMixin,mixins.RetrieveModelMixin,
                        mixins.DestroyModelMixin, viewsets.GenericViewSet):
    """ For deleting, updating and retreiving notes """
    serializer_class = notesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        noteslist = models.Notes.objects.filter(created_by=self.request.user.profile)
        return noteslist


class accessAssignmentView(mixins.ListModelMixin,mixins.RetrieveModelMixin,
                            viewsets.GenericViewSet):
    """ For deleting, updating and retreiving notes """
    serializer_class = assignmentSerializers
    queryset = models.Assignment.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        assignmentlist = models.Assignment.objects.filter(created_by=self.request.user.profile)
        return assignmentlist


class accessOrderView(mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin,
                        mixins.DestroyModelMixin, viewsets.GenericViewSet):
    """ For deleting, updating and retreiving notes """
    serializer_class = orderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        orderlist = models.Order.objects.filter(created_by=self.request.user.profile)
        return orderlist
