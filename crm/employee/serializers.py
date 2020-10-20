from rest_framework import serializers
from api import models

class profileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = ['id', 'name', 'pic', 'qualification', 'address', 'position', 'contact']

    def create(self, validated_data):
        request = self.context.get('request', None)
        validated_data['owner'] = request.user
        perf = Performance()
        perf.save()
        validated_data['performance'] = perf
        user = Profile(**validated_data)
        user.save()
        return user


class profileGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = "__all__"


class notesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notes
        fields = ['id', 'type', 'description']

    def create(self, validated_data):
        request = self.context.get('request', None)
        validated_data['created_by'] = request.user.profile
        notes = Notes(**validated_data)
        notes.save()
        return notes


class assignmentSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Assignment
        fields = '__all__'

    def create(self, validated_data):
        request = self.context.get('request', None)
        validated_data['created_by'] = request.user.profile
        assignment = Assignment(**validated_data)
        assignment.save()
        return assignment


class filesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Files
        fields = ['id', 'name', 'files', 'tag']

    def create(self, validated_data):
        print("enterfile")
        request = self.context.get('request', None)
        validated_data['owner'] = request.user.profile
        tag = validated_data.pop("tag")
        if tag[0] =="e":
            profile = models.Profile.objects.get(id=int(tag[1:]))
            file = models.Files(**validated_data)
            file.save()
            profile.file.add(file.id)
            profile.save()
        return file


class notesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notes
        fields = ['id', 'type', 'description', 'tag']

    def create(self, validated_data):
        request = self.context.get('request', None)
        validated_data['created_by'] = request.user.profile
        tag = validated_data.pop("tag")
        if tag[0] =="e":
            profile = models.Profile.objects.get(id=int(tag[1:]))
            notes = models.Notes(**validated_data)
            notes.save()
            profile.personal_notes.add(notes.id)
            profile.save()
        return notes
