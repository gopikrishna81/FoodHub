import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

username = "admin"
password = "Admin@12345"

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(
        username=username,
        email="admin@gmail.com",
        password=password
    )
    print("Superuser created")
else:
    print("Superuser already exists")