from django.urls import path
from .views import MySkippedMealsView, CreateSkipMealView

urlpatterns = [
    path('my/', MySkippedMealsView.as_view(), name='my-skipped'),
    path('skip/', CreateSkipMealView.as_view(), name='skip-meal'),
]