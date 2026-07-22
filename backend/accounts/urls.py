from django.urls import path
from .views import signup, login, profile, update_profile

urlpatterns = [
    path("signup/", signup),
    path("login/", login),
    path("profile/", profile),
    path("profile/update/", update_profile),
]