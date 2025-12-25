from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Rider, Driver

# riderserializer

class RiderRegisterSerializer(serializers.ModelSerializer):
    # custom fields
    phone = serializers.CharField(write_only = True)
    payment_method = serializers.CharField(write_only = True)
    default_pick = serializers.CharField(write_only = True)
    password  = serializers.CharField(write_only = True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'phone', 'payment_method','default_pick']

    def create(self, validated_data):
        #create user 

        phone = validated_data.pop('phone')
        payment_method = validated_data.pop('payment_method')
        default_pick = validated_data.pop('default_pick')

        user = User.objects.create_user(**validated_data)

        Rider.objects.create(
            user = user,
            phone = phone,
            payment_method = payment_method,
            default_pick = default_pick,

        )
        return user