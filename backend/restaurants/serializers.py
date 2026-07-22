from rest_framework import serializers
from .models import Restaurant, MenuItem, Favorite



class MenuItemSerializer(serializers.ModelSerializer):

    class Meta:

        model = MenuItem

        fields = [
            "id",
            "restaurant",
            "name",
            "description",
            "price",
            "image"
        ]




class RestaurantSerializer(serializers.ModelSerializer):

    menu_items = MenuItemSerializer(
        many=True,
        read_only=True
    )


    class Meta:

        model = Restaurant

        fields = [

            "id",
            "name",
            "image",

            "category",
            "cuisine",

            "rating",
            "delivery_time",
            "offer",

            "city",

            "owner_name",
            "email",
            "phone",
            "address",

            "menu_items"

        ]





class FavoriteSerializer(serializers.ModelSerializer):

    restaurant = RestaurantSerializer(
        read_only=True
    )


    class Meta:

        model = Favorite

        fields = [
            "id",
            "restaurant",
            "created_at"
        ]