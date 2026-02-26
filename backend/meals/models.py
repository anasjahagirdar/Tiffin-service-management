from django.db import models


class MealPlan(models.Model):
    PLAN_TYPE = (
        ('veg', 'Veg'),
        ('nonveg', 'Non-Veg'),
    )

    name = models.CharField(max_length=100)
    plan_type = models.CharField(max_length=10, choices=PLAN_TYPE)
    price_per_day = models.DecimalField(max_digits=6, decimal_places=2)
    description = models.TextField(blank=True)
    image_url = models.URLField(blank=True)

    def __str__(self):
        return f"{self.name} ({self.plan_type})"
