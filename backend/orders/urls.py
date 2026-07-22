from django.urls import path

from .views import (
    place_order,
    get_orders,
    admin_orders
)


urlpatterns = [

    path("place/", place_order),

    path("my-orders/", get_orders),

    path("admin/orders/", admin_orders),

]