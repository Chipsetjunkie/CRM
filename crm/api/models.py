from django.db import models
from accounts.models import User
import os
import uuid


def client_directory(instance, filename):
    item = filename.split('.')
    path = os.path.join('Client', str(instance.id), "profile."+item[-1])
    return path

def profile_directory(instance, filename):
    item = filename.split('.')
    path = os.path.join('DP', str(instance.owner.id), "profile."+item[-1])
    return path


def files_directory(instance, filename):
    item = filename.split('.')
    name = str(uuid.uuid4())
    path = os.path.join('Common', str(instance.owner.id), name+'.'+item[-1])
    return path


class Profile(models.Model):
    owner = models.OneToOneField(User, null=True, blank=True,
                                 on_delete=models.CASCADE)
    pic = models.ImageField(upload_to=profile_directory)
    name = models.CharField(max_length=64)
    address = models.TextField(max_length=128)
    position = models.CharField(max_length=64)
    contact = models.IntegerField()
    qualification = models.CharField(max_length=128)
    projects = models.ManyToManyField('Assignment')
    personal_notes = models.ManyToManyField('Notes')
    performance = models.OneToOneField('Performance',
                                       on_delete=models.CASCADE)
    clients = models.ManyToManyField('Client')
    file = models.ManyToManyField('Files')


class Client(models.Model):
    SECTORS = (
        ('space', "Space"),
        ('electronics', "Electronics"),
        ('augmentations', "Augmentations"),
        ('server', "servers"),
        ('robotics', "Robotics")
    )
    pic = models.ImageField(upload_to=client_directory, blank=True)
    name = models.CharField(max_length=24)
    email = models.EmailField(max_length=64)
    contact = models.IntegerField()
    company = models.CharField(max_length=64)
    sector = models.CharField(max_length=24, choices=SECTORS)
    est_value = models.IntegerField()
    file = models.ManyToManyField('Files')
    deal_status = models.BooleanField(default=False)
    lead_status = models.BooleanField(default=False)
    orders = models.ManyToManyField('Order')
    created = models.DateTimeField(auto_now=True)
    date_closed = models.DateTimeField(null=True, blank=True)
    notes = models.ManyToManyField('Notes')
    created_by = models.ForeignKey('Profile', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Assignment(models.Model):
    TYPES = (
        ('green', "green"),
        ('red', "red"),
        ('yellow', "yellow"),
        ('blue', "blue"),
        ('purple', "purple")
    )
    client = models.ForeignKey('Client', on_delete=models.CASCADE)
    description = models.TextField(max_length=128)
    heading = models.CharField(max_length=24)
    type = models.CharField(max_length=64, choices=TYPES)
    location = models.CharField(max_length=64)
    dueday = models.DateTimeField()
    completed = models.BooleanField(default=False)
    members = models.ManyToManyField('Members', blank=True)
    created_by = models.ForeignKey('Profile', on_delete=models.CASCADE)


class Members(models.Model):
    people = models.ManyToManyField('Profile')


class Notes(models.Model):
    TYPES = (
        ('green', "green"),
        ('red', "red"),
        ('yellow', "yellow"),
        ('blue', "blue"),
        ('purple', "purple")
    )

    type = models.CharField(max_length=64, choices=TYPES)
    date = models.DateTimeField(auto_now=True)
    description = models.TextField(max_length=128)
    completed = models.BooleanField(default=False)
    tag = models.TextField(max_length=10, blank=True, null=True)
    created_by = models.ForeignKey('Profile', on_delete=models.CASCADE)


class Files(models.Model):
    owner = models.ForeignKey('profile', on_delete=models.CASCADE)
    name = models.CharField(max_length=36)
    files = models.FileField(upload_to=files_directory)
    tag = models.TextField(max_length=10, blank=True, null=True)
    created = models.DateTimeField(auto_now=True)


class Order(models.Model):
    item = models.CharField(max_length=64)
    quantity = models.IntegerField()
    demand = models.IntegerField()
    completed = models.BooleanField(default=False)
    invoice = models.ForeignKey('Files', blank=True, null=True,
                                on_delete=models.CASCADE)
    tag = models.TextField(max_length=10, blank=True, null=True)                            
    created_by = models.ForeignKey('Profile', on_delete=models.CASCADE)


class Performance(models.Model):
    Leads_created = models.IntegerField(default=0)
    leads_confirmed = models.IntegerField(default=0)
    leads_dropped = models.IntegerField(default=0)
    deals_created = models.IntegerField(default=0)
    deals_dropped = models.IntegerField(default=0)
    deals_confirmed = models.IntegerField(default=0)
