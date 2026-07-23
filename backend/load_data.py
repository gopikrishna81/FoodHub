import os
import django
import subprocess

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

subprocess.run([
    "python",
    "manage.py",
    "loaddata",
    "data.json"
], check=True)

print("Data imported successfully!")