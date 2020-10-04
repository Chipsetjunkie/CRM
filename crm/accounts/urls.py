from django.urls import path, include
from rest_framework import routers
from . import views


app_name='user'

router = routers.DefaultRouter()
router.register('create', views.UserView, 'create')
router.register('me', views.UserdataView, 'me')

urlpatterns =[
    path('', include(router.urls))
]
