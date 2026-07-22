from django.contrib import admin
from .models import Restaurant, MenuItem, Favorite


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "rating",
        "delivery_time",
        "cuisine",
        "offer"
    ]


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "restaurant",
        "price"
    ]


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "restaurant",
        "created_at"
    ]