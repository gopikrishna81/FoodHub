from django.contrib import admin
from .models import Restaurant, MenuItem


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "owner_name",
        "city",
        "phone",
        "rating",
        "is_active",
    )
    search_fields = ("name", "city", "owner_name")
    list_filter = ("city", "is_active")


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "restaurant",
        "price",
    )
    search_fields = ("name",)
    list_filter = ("restaurant",)