from rest_framework import generics, permissions
from .models import SkipMeal
from .serializers import SkipMealSerializer


class MySkippedMealsView(generics.ListAPIView):
    serializer_class = SkipMealSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SkipMeal.objects.filter(user=self.request.user)


class CreateSkipMealView(generics.CreateAPIView):
    serializer_class = SkipMealSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)