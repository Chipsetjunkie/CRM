from rest_framework import serializers
from api import models


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Client
        fields = ['id','pic', 'name', 'company', 'email', 'contact', 'sector', 'est_value']

    def create(self, validated_data):
        pic = validated_data.pop('pic')
        request = self.context.get('request', None)
        validated_data['created_by'] = request.user.profile
        client = models.Client(**validated_data)
        client.save()
        client.pic = pic
        client.save()
        return client

class ClientGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Client
        fields = "__all__"
