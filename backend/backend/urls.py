from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/restaurants/", include("restaurants.urls")),

    path("api/accounts/", include("accounts.urls")),

    path("api/orders/", include("orders.urls")),
]