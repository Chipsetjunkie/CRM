from django.contrib import admin
from . import models
# Register your models here.

admin.site.register(models.Profile)
admin.site.register(models.Client)
admin.site.register(models.Assignment)
admin.site.register(models.Notes)
admin.site.register(models.Files)
admin.site.register(models.Order)
admin.site.register(models.Content)
admin.site.register(models.Performance)
