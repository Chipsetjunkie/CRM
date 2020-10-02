from django.db import models
from accounts.models import User
# Create your models here.
class Profile(models.Model):
    owner = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
    pic = models.ImageField()
    name = models.CharField(max_length=64)
    address = models.TextField(max_length=128)
    position = models.CharField(max_length=64)
    contact = models.IntegerField()
    qualification = models.CharField(max_length=128)
    projects = models.ManyToManyField('Assignment')
    personal_notes = models.ManyToManyField('Notes',)
    performance = models.OneToOneField('Performance',on_delete=models.CASCADE)


class Client(models.Model):
    SECTORS = (
        ('space', "Space"),
        ('electronics', "Electronics"),
        ('augmentations', "Augmentations"),
        ('server', "servers"),
        ('robotics', "Robotics")
    )
    name = models.CharField(max_length=24)
    email = models.EmailField(max_length=64)
    contact = models.IntegerField()
    company = models.CharField(max_length=64)
    sector = models.CharField(max_length=24, choices=SECTORS )
    est_value = models.IntegerField()
    files = models.ManyToManyField('Files')
    deal_status = models.BooleanField(default=False)
    lead_status = models.BooleanField(default=False)
    orders = models.ManyToManyField('Order')
    created = models.DateTimeField(auto_now=True)
    data_closed = models.DateTimeField(null=True,blank=True)
    notes = models.ManyToManyField('Notes')


class Assignment(models.Model):
    TYPES = (
        ('green', "green"),
        ('red', "red"),
        ('yellow', "yellow"),
        ('blue', "blue"),
        ('purple', "purple")
    )
    client = models.ForeignKey('Client', on_delete=models.CASCADE)
    #leader = models.ForeignKey(Profile, on_delete=models.CASCADE)
    description = models.TextField(max_length=128)
    heading = models.CharField(max_length=24)
    type = models.CharField(max_length=64, choices=TYPES)
    location = models.CharField(max_length=64)
    dueday = models.DateTimeField()
    members = models.ManyToManyField(Profile)

# to client or employee model
class Notes(models.Model):
    TYPES = (
        ('green', "green"),
        ('red', "red"),
        ('yellow', "yellow"),
        ('blue', "blue"),
        ('purple', "purple")
    )
    #From = models.ForeignKey("Profile",on_delete=models.CASCADE)
    type = models.CharField(max_length=64, choices=TYPES)
    date = models.DateTimeField(auto_now=True)
    description = models.TextField(max_length=128)

class Files(models.Model):
    name = models.CharField(max_length=36)
    files = models.FileField()
    created = models.DateTimeField(auto_now=True)

class Order(models.Model):
    content = models.ForeignKey("Content", on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    invoice = models.ForeignKey('Files', on_delete=models.CASCADE)


class Content(models.Model):
    item = models.CharField(max_length=64)
    quantity = models.IntegerField()
    demand = models.IntegerField()

class Performance(models.Model):
    Leads_created = models.IntegerField()
    leads_confirmed = models.IntegerField()
    leads_dropped = models.IntegerField()
    deals_created = models.IntegerField()
    deals_dropped = models.IntegerField()
    deals_confirmed = models.IntegerField()
