from rest_framework import mixins, viewsets;
from rest_framework.views import APIView;
from rest_framework.permissions import IsAuthenticated
from .serializers import profileSerializer, notesSerializer,\
                          assignmentSerializers,filesSerializer,\
                          profileGetSerializer,profileAllSerializer,\
                          assignmentGetSerializers,TimeSerializers
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
    serializer_class = profileGetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        employee = models.Profile.objects.filter(owner_id=self.request.user)
        return employee
        # return models.Profile.objects.all()

class accessAllProfile(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                         mixins.DestroyModelMixin, viewsets.GenericViewSet,
                         mixins.UpdateModelMixin):
    serializer_class = profileAllSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        employee = models.Profile.objects.all().exclude(owner_id=self.request.user)
        return employee

class createAssignmentView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """ Creates assignment """
    serializer_class = assignmentSerializers
    queryset = models.Assignment.objects.all()
    permission_classes = [IsAuthenticated]



class accessAssignmentView(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                           viewsets.GenericViewSet):
    """ For deleting, updating and retreiving notes """
    serializer_class = assignmentGetSerializers
    queryset = models.Assignment.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        assignmentlist = models.Assignment.objects.filter(created_by=self.request.user.profile).order_by('-id')
        return assignmentlist



class createNoteView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """ Creates notes """
    serializer_class = notesSerializer
    queryset = models.Notes.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        notes = models.Notes.objects.filter(created_by=self.request.user.profile).order_by('-id')
        return notes

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


class accessFileView(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                     mixins.DestroyModelMixin, viewsets.GenericViewSet):
        serializer_class = filesSerializer
        permission_classes = [IsAuthenticated]

        def get_queryset(self):
            filelist = models.Files.objects.filter(owner=self.request.user.profile).order_by("-id")
            return filelist


class logoutUser(APIView):
    def get(self, request, format=None):
        # delete token
        request.user.auth_token.delete()
        data = {
            "message": "logged out successfully!"
        }
        return Response(data)



class accessTimeView(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    """ Access Time """
    queryset= models.Time.objects.all()
    serializer_class = TimeSerializers
    permission_classes = [IsAuthenticated]
