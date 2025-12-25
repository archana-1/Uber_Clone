from django.contrib import admin
from apps.rides.models import DriverLocation, RideDetails
# Register your models here.
admin.site.register(DriverLocation)
admin.site.register(RideDetails)