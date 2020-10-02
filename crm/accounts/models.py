from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,\
                                            PermissionsMixin



class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extras):
        if not email:
            raise ValueError("Please provide your email!!")

        user = self.model(email= self.normalize_email(email), **extras)
        user.set_password(password)
        user.save(using=self._db)
        return user


    def create_superuser(self, email, password, **extras):
        user = self.create_user(email, password, **extras)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user



class User(AbstractBaseUser, PermissionsMixin):

    USERNAME_FIELD = 'email'

    email = models.EmailField(max_length=35, unique=True)
    name = models.CharField(max_length=35)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()
