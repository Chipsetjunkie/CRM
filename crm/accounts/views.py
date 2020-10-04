from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.settings import api_settings
from .serializers import UserSerializer
from django.contrib.auth import get_user_model



class UserView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()


class UserdataView(mixins.ListModelMixin,mixins.RetrieveModelMixin,mixins.DestroyModelMixin,viewsets.GenericViewSet):
    serializer_class= UserSerializer
    permission_classes =[IsAuthenticated]

    def get_queryset(self):
        id = self.request.user.id
        return get_user_model().objects.filter(id=id)
