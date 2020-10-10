from rest_framework import mixins, viewsets;
from rest_framework.views import APIView;
from rest_framework.permissions import IsAuthenticated
from .serializers import profileSerializer, notesSerializer,\
                            assignmentSerializers, orderSerializer,\
                            fileUploadSerializer;
from api import models;
from rest_framework import status;
from rest_framework.response import Response;


class EmployeeView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """ Creates employee """
    serializer_class = profileSerializer
    queryset = models.Profile.objects.all()
    permission_classes = [IsAuthenticated]


# Permission should be revoken.. this method is only for testing,
# Tweak query for admin
class accessEmployeeView(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                         mixins.DestroyModelMixin, viewsets.GenericViewSet,
                         mixins.UpdateModelMixin):
    """ Update employee views and mainly for files """
    serializer_class = profileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        employee = models.Profile.objects.filter(owner_id=self.request.user)
        return employee
        # return models.Profile.objects.all()


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


class accessNoteView(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                     mixins.DestroyModelMixin, viewsets.GenericViewSet):
    """ For deleting, updating and retreiving notes """
    serializer_class = notesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        noteslist = models.Notes.objects.filter(created_by=self.request.user.profile)
        return noteslist


class accessAssignmentView(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                           viewsets.GenericViewSet):
    """ For deleting, updating and retreiving notes """
    serializer_class = assignmentSerializers
    queryset = models.Assignment.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        assignmentlist = models.Assignment.objects.filter(created_by=self.request.user.profile)
        return assignmentlist


class accessOrderView(mixins.ListModelMixin, mixins.UpdateModelMixin,
                      mixins.RetrieveModelMixin, mixins.DestroyModelMixin,
                      viewsets.GenericViewSet):
    """ For deleting, updating and retreiving notes """
    serializer_class = orderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        orderlist = models.Order.objects.filter(created_by=self.request.user.profile)
        return orderlist


class updateOrderView(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    """ Update Order values"""
    serializer_class = orderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        orderlist = models.Order.objects.filter(created_by=self.request.user.profile)
        return orderlist


class updateNoteView(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    """Update Note values"""
    serializer_class = notesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        noteslist = models.Notes.objects.filter(created_by=self.request.user.profile)
        return noteslist


class fileView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """ create a file and send to either employee or client"""
    serializer_class = fileUploadSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'message': 'Aok'}, status=status.HTTP_201_CREATED)


class logoutUser(APIView):
    def get(self, request, format=None):
        # delete token
        request.user.auth_token.delete()
        data = {
            "message": "logged out successfully!"
        }
        return Response(data)
