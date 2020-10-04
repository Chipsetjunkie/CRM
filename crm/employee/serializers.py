from api.models import Profile, Performance, Notes, Assignment, Order
from rest_framework import serializers



class profileSerilalizer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id','pic','name','address', 'position', 'contact', 'qualification']


    def create(self, validated_data):
        request = self.context.get('request', None)
        validated_data['owner'] = request.user
        perf = Performance()
        perf.save()
        validated_data['performance'] = perf
        user =Profile(**validated_data)
        user.save()
        return user


class notesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ['id','type','description']

    def create(self, validated_data):
        request = self.context.get('request', None)
        validated_data['created_by'] = request.user.profile
        notes = Notes(**validated_data)
        notes.save()
        return notes


class assignmentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['id', 'heading', 'description', 'type', 'location', 'dueday', 'client']

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


class AuthSerializer(serializers.Serializer):
    email = serializers.CharField()
    password =serializers.CharField(style={'input_type':'password'}, trim_whitespace=False)
