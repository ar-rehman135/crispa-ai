from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CombinedListView,
    JournalEntryLinesViewSet,
    AccountViewSet,
    CurrencyViewSet,
    CombinedReportView
)

router = DefaultRouter()
router.register(r"journalentrylines", JournalEntryLinesViewSet)
router.register(r"accounts", AccountViewSet)
router.register(r"currencies", CurrencyViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path('generate_report/', CombinedReportView.as_view(), name='generate-report'),
    path("all_data/", CombinedListView.as_view(), name="combined-list"),
]
