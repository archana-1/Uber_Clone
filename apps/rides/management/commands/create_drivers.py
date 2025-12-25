from django.core.management import BaseCommand
from apps.accounts.models import Driver
from apps.rides.models import DriverLocation
from django.contrib.auth.models import User
import random
from  datetime import  datetime, timezone
class Command(BaseCommand):
    help = "create drivers"

    def handle(self,*arg, **options ):
        print('fake data')
        # barkatulla
        CENTRE_LAT = 23.199699964955865
        CENTRE_LNG = 77.45161413365983

        
        # delete all users "user_ "
        User.objects.filter(username__startswith='user_').delete()
       
        print("existing deleted from- Users, Drivers, DriverLocations !")
        for i in range(1,31):
            # AROUND THIS PLACE
            val =  random.uniform(0.2,.5)
        
            LAT = random.uniform(CENTRE_LAT - val, CENTRE_LAT + val)
            LNG = random.uniform(CENTRE_LNG - val, CENTRE_LNG + val)
            user = User.objects.create(
                username = f"user_{i}",
                email=f"user_{i}@example.com",
                
            )
            if user:
                driver = Driver.objects.create(
                    user = user,
                    phone = f"+91{random.randint(8123102576, 9999999999)}",                    
                    vehicle_type = f"{random.choice(['Sedan', 'SUV', 'Prime'])}"
                )
            
                if driver:
                    driverloc = DriverLocation.objects.create(
                        user = driver,
                        timestamp = datetime.now(timezone.utc),
                        latitude = LAT,
                        longitude = LNG        
                    )
                else: return
            else: return
        self.stdout.write(self.style.SUCCESS("✅ 30 drivers with random locations created"))