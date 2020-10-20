from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('client', views.ClientView, 'client')
router.register('access/client', views.accessClientView, 'client-access')
router.register('create/client/note', views.createNoteView, 'client-notes')
router.register('create/client/file', views.createFileView, 'client-files')
router.register('create/client/order', views.createOrderView, 'client-files')
router.register('client/notes', views.accessNoteView, 'access-client-notes')
router.register('client/orders', views.accessOrderView, 'access-client-orders')
router.register('client/files', views.accessFileView, 'access-client-notes')

urlpatterns = [
    path('', include(router.urls))
]
