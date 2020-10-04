from rest_framework import serializers
from api import models


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Client
        fields = ['name', 'email', 'contact', 'sector', 'est_value']


    def create(self, validated_data):
        request = self.context.get('request', None)
        validated_data['created_by'] = request.user.profile
        client = models.Client(**validated_data)
        client.save()
        return client
