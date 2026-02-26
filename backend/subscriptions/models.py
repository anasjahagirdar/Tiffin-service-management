from django.db import models
from django.conf import settings
from meals.models import MealPlan


class Subscription(models.Model):
    STATUS = (
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('cancelled', 'Cancelled'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    meal_plan = models.ForeignKey(MealPlan, on_delete=models.CASCADE)

    start_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS, default='active')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} -> {self.meal_plan}"