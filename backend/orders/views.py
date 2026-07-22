from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser
)

from .models import Order, OrderItem
from .serializers import OrderSerializer

@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_orders(request):

    orders = Order.objects.all().order_by("-created_at")

    serializer = OrderSerializer(
        orders,
        many=True
    )

    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def place_order(request):

    items = request.data.get("items", [])

    total_price = request.data.get(
        "total_price"
    )


    customer_name = request.data.get(
        "customer_name",
        request.user.username
    )


    phone = request.data.get(
        "phone",
        ""
    )


    address = request.data.get(
        "address",
        ""
    )


    payment_method = request.data.get(
        "payment_method",
        "Cash on Delivery"
    )



    if not items:

        return Response(
            {
                "message": "Cart is empty"
            },
            status=status.HTTP_400_BAD_REQUEST
        )



    order = Order.objects.create(

        user=request.user,

        customer_name=customer_name,

        phone=phone,

        address=address,

        payment_method=payment_method,

        total_price=total_price,

    )



    for item in items:


        OrderItem.objects.create(

            order=order,

            item_name=item["name"],

            quantity=item.get(
                "quantity",
                1
            ),

            price=item["price"],

        )



    return Response(

        {
            "message":
            "Order placed successfully",

            "order_id":
            order.id,
        },

        status=status.HTTP_201_CREATED,

    )





@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_orders(request):


    orders = Order.objects.filter(

        user=request.user

    ).order_by("-created_at")



    serializer = OrderSerializer(

        orders,

        many=True

    )



    return Response(
        serializer.data
    )