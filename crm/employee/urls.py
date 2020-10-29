from django.urls import path, include
from rest_framework import routers

from rest_framework.authtoken.views import obtain_auth_token

from . import views

router = routers.DefaultRouter()
router.register('employee', views.EmployeeView, 'employee')
router.register('access/employee', views.accessEmployeeView, 'employee-access')
router.register('access/all',views.accessAllProfile, 'all-access')
router.register('create/employee/notes', views.createNoteView, 'notes')
router.register('create/employee/files', views.createFileView, 'files')
router.register('create/employee/assignment', views.createAssignmentView, 'assign')
router.register('employee/notes', views.accessNoteView, 'notes-access')
router.register('employee/files', views.accessFileView, 'files-access')
router.register('employee/assignment', views.accessAssignmentView, 'assign-access')
router.register('access/time', views.accessTimeView, 'access-time')


urlpatterns = [
    path('', include(router.urls)),
    path('api/login', obtain_auth_token, name='token_obtain_pair'),
    path('api/logout', views.logoutUser.as_view(), name='token_verify'),
    path('api/links', views.UrlsView.as_view(), name="links")
]
