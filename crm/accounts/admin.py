from django.contrib import admin
from . import models
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class Useradmin(BaseUserAdmin):
    """ Epowering models with user admin properties and fields """
    ordering = ['id']
    list_display = ['email', 'name']
    fieldsets = (
            (None, {'fields': ('email', 'password')}),
            (('Permission'), {'fields': ('is_active', 'is_staff', 'is_superuser')}),
            (('Important dates'), {'fields': ('last_login',)})
            )

    add_fieldsets = (
                    (None, {'classes': ('wide',), 'fields': ('email', 'password1', 'password2')})
    )


admin.site.register(models.User, Useradmin)
