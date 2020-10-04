from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'name', 'password']
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        user.is_staff = True
        user.save()
        group, status = Group.objects.get_or_create(name='Employee')
        user.groups.add(group)
        user.save()

        return user
