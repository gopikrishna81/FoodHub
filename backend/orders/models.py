from django.db import models
from django.contrib.auth.models import User


class Order(models.Model):

    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Preparing", "Preparing"),
        ("Out for Delivery", "Out for Delivery"),
        ("Delivered", "Delivered"),
        ("Cancelled", "Cancelled"),
    ]


    PAYMENT_CHOICES = [
        ("Cash on Delivery", "Cash on Delivery"),
        ("UPI", "UPI"),
        ("Card", "Card"),
    ]


    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="orders"
    )


    customer_name = models.CharField(
        max_length=100
    )


    phone = models.CharField(
        max_length=15,
        blank=True
    )


    address = models.TextField(
        blank=True
    )


    payment_method = models.CharField(
        max_length=50,
        choices=PAYMENT_CHOICES,
        default="Cash on Delivery"
    )


    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )


    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="Pending"
    )


    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):

        return f"Order #{self.id} - {self.customer_name}"





class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )


    item_name = models.CharField(
        max_length=100
    )


    quantity = models.PositiveIntegerField(
        default=1
    )


    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )


    def __str__(self):

        return self.item_name