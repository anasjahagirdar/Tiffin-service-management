from datetime import date
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from subscriptions.models import Subscription
from deliveries.models import SkipMeal


class MyBillView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        subscriptions = Subscription.objects.filter(user=request.user, status='active')

        total = 0

        for sub in subscriptions:
            days_active = (date.today() - sub.start_date).days + 1

            skipped = SkipMeal.objects.filter(
                user=request.user,
                date__gte=sub.start_date
            ).count()

            chargeable_days = max(days_active - skipped, 0)

            total += chargeable_days * sub.meal_plan.price_per_day

        return Response({
            "total_bill": total
        })