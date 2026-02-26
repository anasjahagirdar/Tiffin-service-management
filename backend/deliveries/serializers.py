from rest_framework import serializers
from .models import SkipMeal


class SkipMealSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkipMeal
        fields = '__all__'
        read_only_fields = ('user',)