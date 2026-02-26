from rest_framework import generics
from .models import MealPlan
from .serializers import MealPlanSerializer


class MealPlanListView(generics.ListAPIView):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer