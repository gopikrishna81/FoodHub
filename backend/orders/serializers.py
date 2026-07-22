from rest_framework import serializers
from .models import Order, OrderItem



class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:

        model = OrderItem

        fields = [
            "id",
            "item_name",
            "quantity",
            "price",
        ]





class OrderSerializer(serializers.ModelSerializer):


    items = OrderItemSerializer(
        many=True,
        read_only=True
    )


    class Meta:

        model = Order


        fields = [

            "id",

            "user",

            "customer_name",

            "phone",

            "address",

            "payment_method",

            "total_price",

            "status",

            "created_at",

            "items",

        ]



        read_only_fields = [

            "user",

            "status",

            "created_at",

        ]