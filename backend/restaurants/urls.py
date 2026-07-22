from django.urls import path

from .views import (
    restaurant_list,
    restaurant_detail,
    menu_list,

    add_favorite,
    remove_favorite,
    favorite_list,

    admin_add_restaurant,
    admin_update_restaurant,
    admin_delete_restaurant,

    admin_add_menu,
    admin_update_menu,
    admin_delete_menu,
)


urlpatterns = [

    # Restaurants
    path(
        "",
        restaurant_list,
        name="restaurant-list",
    ),

    path(
        "<int:id>/",
        restaurant_detail,
        name="restaurant-detail",
    ),


    # Menu
    path(
        "<int:restaurant_id>/menu/",
        menu_list,
        name="menu-list",
    ),


    # Favorites
    path(
        "favorites/",
        favorite_list,
        name="favorite-list",
    ),

    path(
        "<int:restaurant_id>/favorite/",
        add_favorite,
        name="add-favorite",
    ),

    path(
        "<int:restaurant_id>/unfavorite/",
        remove_favorite,
        name="remove-favorite",
    ),



    # Admin Restaurant Management

    path(
        "admin/restaurants/add/",
        admin_add_restaurant,
        name="admin-add-restaurant",
    ),

    path(
        "admin/restaurants/<int:id>/update/",
        admin_update_restaurant,
        name="admin-update-restaurant",
    ),

    path(
        "admin/restaurants/<int:id>/delete/",
        admin_delete_restaurant,
        name="admin-delete-restaurant",
    ),



    # Admin Menu Management

    path(
        "admin/menu/add/",
        admin_add_menu,
        name="admin-add-menu",
    ),

    path(
        "admin/menu/<int:id>/update/",
        admin_update_menu,
        name="admin-update-menu",
    ),

    path(
        "admin/menu/<int:id>/delete/",
        admin_delete_menu,
        name="admin-delete-menu",
    ),

]