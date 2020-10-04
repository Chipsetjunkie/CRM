from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
        TokenObtainPairView,
        TokenRefreshView,
        TokenVerifyView
)

from . import views

router = routers.DefaultRouter()
router.register('employee', views.EmployeeView, 'employee')
router.register('notes', views.createNoteView, 'create-notes')
router.register('assignment', views.createAssignmentView, 'create-assignment')
router.register('order', views.createOrderView, 'create-order')
router.register('access/notes', views.accessNoteView, 'access-notes')
router.register('access/assignment', views.accessAssignmentView, 'acess-assignment')
router.register('access/order', views.accessOrderView, 'acess-order')

urlpatterns = [
    path('', include(router.urls)),
    path('login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh', TokenRefreshView.as_view(), name='toekn_refresh'),
    path('login/verify', TokenVerifyView.as_view(), name='token_verify')
]
