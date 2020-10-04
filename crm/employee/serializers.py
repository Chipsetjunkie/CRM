from api.models import Profile, Performance, Notes, Assignment, Order, Files, Client
from rest_framework import serializers


class profileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

    def create(self, validated_data):
        request = self.context.get('request', None)
        validated_data['owner'] = request.user
        perf = Performance()
        perf.save()
        validated_data['performance'] = perf
        user = Profile(**validated_data)
        user.save()
        return user


class notesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ['id', 'type', 'description']

    def create(self, validated_data):
        request = self.context.get('request', None)
        validated_data['created_by'] = request.user.profile
        notes = Notes(**validated_data)
        notes.save()
        return notes


class assignmentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

    def create(self, validated_data):
        request = self.context.get('request', None)
        validated_data['created_by'] = request.user.profile
        assignment = Assignment(**validated_data)
        assignment.save()
        return assignment


class orderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'item', 'quantity', 'demand']

    def create(self, validated_data):
        request = self.context.get('request', None)
        validated_data['created_by'] = request.user.profile
        order = Order(**validated_data)
        order.save()
        return order


class fileUploadSerializer(serializers.Serializer):
    TYPE = (
        ('E', 'Employee'),
        ('C', 'Client')
    )
    type = serializers.ChoiceField(choices=TYPE)
    name = serializers.CharField(max_length=36)
    create = serializers.DateTimeField()
    files = serializers.FileField()
    client = serializers.IntegerField()

    def create(self, validated_data):

        request = self.context.get('request', None)
        type = validated_data.pop('type')
        id = validated_data.pop('client')
        validated_data['owner'] = request.user.profile
        if type == 'C':
            data = Client.objects.get(id=id)
        else:
            data = request.user.profile
        file = Files(**validated_data)
        file.save()

        data.file.add(file)
        data.save()
        return file
