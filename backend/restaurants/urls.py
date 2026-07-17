from django.urls import path
from .views import restaurant_list, restaurant_detail, menu_list

urlpatterns = [
    path("", restaurant_list, name="restaurant-list"),
    path("<int:id>/", restaurant_detail, name="restaurant-detail"),
    path("<int:restaurant_id>/menu/", menu_list, name="menu-list"),
]