from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    email = serializers.EmailField(
        source="user.email",
        required=False
    )


    class Meta:

        model = Profile

        fields = [
            "username",
            "email",
            "phone",
            "address",
        ]



    def update(self, instance, validated_data):

        user_data = validated_data.pop(
            "user",
            {}
        )


        instance.phone = validated_data.get(
            "phone",
            instance.phone
        )


        instance.address = validated_data.get(
            "address",
            instance.address
        )


        instance.user.email = user_data.get(
            "email",
            instance.user.email
        )


        instance.user.save()

        instance.save()


        return instance