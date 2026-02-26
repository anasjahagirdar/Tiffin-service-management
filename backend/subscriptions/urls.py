from django.urls import path
from .views import MySubscriptionsView, CreateSubscriptionView

urlpatterns = [
    path('my/', MySubscriptionsView.as_view(), name='my-subscriptions'),
    path('create/', CreateSubscriptionView.as_view(), name='create-subscription'),
]