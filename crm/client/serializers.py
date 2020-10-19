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

    def update(self, instance, validated_data):
        if "name" in validated_data:
            instance.name = validated_data.get('name', instance.name)

        if "email" in validated_data:
            instance.email = validated_data.get('email', instance.email)

        if "pic" in validated_data:
            instance.pic = validated_data.get('pic', instance.pic)

        if "contact" in validated_data:
            instance.name = validated_data.get('contact', instance.contact)

        if "est_value" in validated_data:
            instance.est_value = validated_data.get('est_value', instance.est_value)

        if "company" in validated_data:
            instance.name = validated_data.get('company', instance.name)

        instance.save()
        return instance


class notesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notes
        fields = ['id', 'type', 'description', 'tag']

    def create(self, validated_data):
        request = self.context.get('request', None)
        validated_data['created_by'] = request.user.profile
        tag = validated_data.pop("tag")
        if tag[0] =="c":
            client = models.Client.objects.get(id=int(tag[1:]))
            notes = models.Notes(**validated_data)
            notes.save()
            client.notes.add(notes.id)
            client.save()
        return notes


class filesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Files
        fields = ['id', 'name', 'files', 'tag']

    def create(self, validated_data):
        print("enterfile")
        request = self.context.get('request', None)
        validated_data['owner'] = request.user.profile
        tag = validated_data.pop("tag")
        if tag[0] =="c":
            client = models.Client.objects.get(id=int(tag[1:]))
            file = models.Files(**validated_data)
            file.save()
            client.file.add(file.id)
            client.save()
        return file


class orderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ['id', 'item', 'quantity', 'demand', 'tag']

    def create(self, validated_data):
        request = self.context.get('request', None)
        validated_data['created_by'] = request.user.profile
        tag = validated_data.pop("tag")
        if tag[0] =="c":
            client = models.Client.objects.get(id=int(tag[1:]))
            order = models.Order(**validated_data)
            order.save()
            client.orders.add(order.id)
            client.save()
        return order
