from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Restaurant, MenuItem
from .serializers import RestaurantSerializer, MenuItemSerializer

@api_view(["GET"])
def restaurant_list(request):
    restaurants = Restaurant.objects.all()
    serializer = RestaurantSerializer(restaurants, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def restaurant_detail(request, id):
    restaurant = Restaurant.objects.get(id=id)
    serializer = RestaurantSerializer(restaurant)
    return Response(serializer.data)

@api_view(["GET"])
def menu_list(request, restaurant_id):
    menu_items = MenuItem.objects.filter(restaurant_id=restaurant_id)
    serializer = MenuItemSerializer(menu_items, many=True)
    return Response(serializer.data)