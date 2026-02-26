from django.urls import path
from .views import MyBillView

urlpatterns = [
    path('my/', MyBillView.as_view(), name='my-bill'),
]