from django.urls import path
from .views import MealPlanListView

urlpatterns = [
    path('plans/', MealPlanListView.as_view(), name='meal-plans'),
]
