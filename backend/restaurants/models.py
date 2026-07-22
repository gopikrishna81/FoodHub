from django.db import models
from django.contrib.auth.models import User



class Restaurant(models.Model):

    name = models.CharField(max_length=100)

    image = models.URLField(blank=True)

    category = models.CharField(
        max_length=100,
        blank=True
    )

    cuisine = models.CharField(
        max_length=100,
        blank=True
    )

    city = models.CharField(
        max_length=100,
        blank=True
    )

    rating = models.FloatField(
        default=0
    )

    delivery_time = models.CharField(
        max_length=50,
        blank=True
    )

    offer = models.CharField(
        max_length=100,
        blank=True
    )


    owner_name = models.CharField(
        max_length=100,
        blank=True
    )

    email = models.EmailField(
        blank=True
    )

    phone = models.CharField(
        max_length=15,
        blank=True
    )

    address = models.TextField(
        blank=True
    )


    def __str__(self):
        return self.name





class MenuItem(models.Model):

    restaurant = models.ForeignKey(
        Restaurant,
        related_name="menu_items",
        on_delete=models.CASCADE
    )

    name = models.CharField(
        max_length=100
    )

    description = models.TextField(
        blank=True
    )

    price = models.DecimalField(
        max_digits=8,
        decimal_places=2
    )

    image = models.URLField(
        blank=True
    )


    def __str__(self):

        return self.name






class Favorite(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):

        return f"{self.user.username} - {self.restaurant.name}"

class Review(models.Model):

    restaurant = models.ForeignKey(
        Restaurant,
        related_name="reviews",
        on_delete=models.CASCADE
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    rating = models.IntegerField(
        default=5
    )

    comment = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):

        return f"{self.restaurant.name} - {self.rating}"