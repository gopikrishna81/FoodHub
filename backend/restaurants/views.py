from django.db.models import Q

from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import (
    Restaurant,
    MenuItem,
    Review,
    Favorite,
)

from .serializers import (
    RestaurantSerializer,
    MenuItemSerializer,
    FavoriteSerializer,
)


def admin_check(request):

    if not request.user.is_staff:

        return Response(
            {
                "message": "Admin access required"
            },
            status=403
        )

    return None


# ----------------------------
# RESTAURANTS
# ----------------------------

@api_view(["GET"])
def restaurant_list(request):

    restaurants = Restaurant.objects.all()

    search = request.GET.get("search")
    city = request.GET.get("city")
    category = request.GET.get("category")
    rating = request.GET.get("rating")

    if search:
        restaurants = restaurants.filter(
            Q(name__icontains=search)
        )

    if city:
        restaurants = restaurants.filter(
            city__iexact=city
        )

    if category:
        restaurants = restaurants.filter(
            category__iexact=category
        )

    if rating:
        restaurants = restaurants.filter(
            rating__gte=rating
        )

    serializer = RestaurantSerializer(
        restaurants,
        many=True
    )

    return Response(serializer.data)


@api_view(["GET"])
def restaurant_detail(request, id):

    try:
        restaurant = Restaurant.objects.get(id=id)

    except Restaurant.DoesNotExist:
        return Response(
            {
                "message": "Restaurant not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = RestaurantSerializer(restaurant)

    return Response(serializer.data)


# ----------------------------
# MENU
# ----------------------------

@api_view(["GET"])
def menu_list(request, restaurant_id):

    menu_items = MenuItem.objects.filter(
        restaurant_id=restaurant_id
    )

    serializer = MenuItemSerializer(
        menu_items,
        many=True
    )

    return Response(serializer.data)


# ----------------------------
# REVIEWS
# ----------------------------

@api_view(["GET"])
def restaurant_reviews(request, restaurant_id):

    reviews = Review.objects.filter(
        restaurant_id=restaurant_id
    ).order_by("-created_at")

    serializer = ReviewSerializer(
        reviews,
        many=True
    )

    return Response(serializer.data)


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_review(request, restaurant_id):

    try:
        restaurant = Restaurant.objects.get(id=restaurant_id)

    except Restaurant.DoesNotExist:
        return Response(
            {
                "message": "Restaurant not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    review, created = Review.objects.get_or_create(
        restaurant=restaurant,
        user=request.user,
        defaults={
            "rating": request.data.get("rating"),
            "comment": request.data.get("comment"),
        },
    )

    if not created:
        review.rating = request.data.get("rating")
        review.comment = request.data.get("comment")
        review.save()

        return Response({
            "message": "Review Updated Successfully"
        })

    return Response({
        "message": "Review Added Successfully"
    })


@api_view(["PUT"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def edit_review(request, review_id):

    try:
        review = Review.objects.get(
            id=review_id,
            user=request.user
        )

    except Review.DoesNotExist:
        return Response(
            {
                "message": "Review not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    review.rating = request.data.get(
        "rating",
        review.rating
    )

    review.comment = request.data.get(
        "comment",
        review.comment
    )

    review.save()

    return Response({
        "message": "Review Updated Successfully"
    })


@api_view(["DELETE"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_review(request, review_id):

    try:
        review = Review.objects.get(
            id=review_id,
            user=request.user
        )

    except Review.DoesNotExist:
        return Response(
            {
                "message": "Review not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    review.delete()

    return Response({
        "message": "Review Deleted Successfully"
    })


# ----------------------------
# FAVORITES
# ----------------------------

@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def favorite_list(request):

    favorites = Favorite.objects.filter(
        user=request.user
    )

    serializer = FavoriteSerializer(
        favorites,
        many=True
    )

    return Response(serializer.data)


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_favorite(request, restaurant_id):

    try:
        restaurant = Restaurant.objects.get(id=restaurant_id)

    except Restaurant.DoesNotExist:
        return Response(
            {
                "message": "Restaurant not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    Favorite.objects.get_or_create(
        user=request.user,
        restaurant=restaurant,
    )

    return Response({
        "message": "Added to Favorites"
    })


@api_view(["DELETE"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def remove_favorite(request, restaurant_id):

    Favorite.objects.filter(
        user=request.user,
        restaurant_id=restaurant_id,
    ).delete()

    return Response({
        "message": "Removed from Favorites"
    })


# ----------------------------
# ADMIN RESTAURANTS
# ----------------------------


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def admin_add_restaurant(request):

    error = admin_check(request)

    if error:
        return error


    restaurant = Restaurant.objects.create(

        name=request.data.get("name"),

        owner_name=request.data.get("owner_name"),

        email=request.data.get("email"),

        phone=request.data.get("phone"),

        address=request.data.get("address"),

        city=request.data.get("city"),

        category=request.data.get("category"),

        image=request.data.get("image"),

        rating=request.data.get(
            "rating",
            0
        ),

    )


    serializer = RestaurantSerializer(
        restaurant
    )


    return Response(
        serializer.data,
        status=201
    )





@api_view(["PUT"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def admin_update_restaurant(request,id):

    error = admin_check(request)

    if error:
        return error



    restaurant = Restaurant.objects.get(
        id=id
    )


    serializer = RestaurantSerializer(
        restaurant,
        data=request.data,
        partial=True
    )


    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data
        )


    return Response(
        serializer.errors,
        status=400
    )






@api_view(["DELETE"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def admin_delete_restaurant(request,id):

    error = admin_check(request)

    if error:
        return error



    restaurant = Restaurant.objects.get(
        id=id
    )


    restaurant.delete()


    return Response(
        {
            "message":
            "Restaurant deleted successfully"
        }
    )

@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def admin_add_menu(request):

    if not request.user.is_staff:
        return Response(
            {
                "message": "Admin access required"
            },
            status=403
        )


    menu_item = MenuItem.objects.create(

        restaurant_id=request.data.get("restaurant"),

        name=request.data.get("name"),

        price=request.data.get("price"),

        image=request.data.get("image"),

        description=request.data.get("description"),

    )


    serializer = MenuItemSerializer(
        menu_item
    )


    return Response(
        serializer.data,
        status=201
    )





@api_view(["PUT"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def admin_update_menu(request, id):

    if not request.user.is_staff:
        return Response(
            {
                "message": "Admin access required"
            },
            status=403
        )

    try:
        menu_item = MenuItem.objects.get(id=id)

    except MenuItem.DoesNotExist:
        return Response(
            {
                "message": "Menu item not found"
            },
            status=404
        )

    serializer = MenuItemSerializer(
        menu_item,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():
        serializer.save()

        return Response(
            {
                "message": "Menu Updated",
                "data": serializer.data
            }
        )

    return Response(
        serializer.errors,
        status=400
    )




@api_view(["DELETE"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def admin_delete_menu(request,id):

    if not request.user.is_staff:
        return Response(
            {
                "message": "Admin access required"
            },
            status=403
        )


    menu_item = MenuItem.objects.get(
        id=id
    )


    menu_item.delete()


    return Response(
        {
            "message":
            "Menu item deleted successfully"
        }
    )
    