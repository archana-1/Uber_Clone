from django.db import models
from apps.accounts.models import Driver, Rider
# Create your models here.

class DriverLocation(models.Model):
    user = models.OneToOneField(Driver, on_delete= models.CASCADE)
    timestamp = models.DateTimeField(auto_now = True)
    latitude = models.DecimalField(max_digits = 9, decimal_places = 6)
    longitude = models.DecimalField(max_digits = 9, decimal_places = 6)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.user.username}@{self.timestamp}"
class RideDetails(models.Model):
    CHOICES = (
        ('allocated','Allocated'),
        ('completed','Completed')
    )

    
    rider =models.OneToOneField(Rider, on_delete=models.CASCADE)
    driver = models.OneToOneField(Driver, on_delete=models.CASCADE)
    pick_up = models.CharField(max_length=20)
    status = models.CharField(max_length= 20, choices=CHOICES, default='allocated')
    fare=models.DecimalField(max_digits=5, decimal_places=2)