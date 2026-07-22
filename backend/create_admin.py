import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

username = "admin"

user, created = User.objects.get_or_create(
    username=username,
    defaults={
        "email": "admin@gmail.com",
    }
)

user.set_password("Admin@12345")
user.is_staff = True
user.is_superuser = True
user.save()

print("Admin user fixed successfully")