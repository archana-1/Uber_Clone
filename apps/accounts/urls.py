from django.urls import path
from . import views

urlpatterns =[
    path('register/rider', views.registerrider, name='registerrider'),
    # path('register/driver', views.registerdriver, name='registerdriver')
    path('login', views.login, name='login')
]