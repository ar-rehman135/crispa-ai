
from django.urls import path
from .views import (
    JournalEntryLinesListCreate, JournalEntryLinesRetrieveUpdateDestroy,
    AccountListCreate, AccountRetrieveUpdateDestroy,
    CurrencyListCreate, CurrencyRetrieveUpdateDestroy
)
from rest_framework.routers import DefaultRouter
router = DefaultRouter()

urlpatterns = [
    path('journal-entry-lines/', JournalEntryLinesListCreate.as_view(), name='journal-entry-lines-list'),
    path('journal-entry-lines/<uuid:pk>/', JournalEntryLinesRetrieveUpdateDestroy.as_view(), name='journal-entry-lines-detail'),
    path('accounts/', AccountListCreate.as_view(), name='accounts-list'),
    path('accounts/<int:pk>/', AccountRetrieveUpdateDestroy.as_view(), name='accounts-detail'),
    path('currencies/', CurrencyListCreate.as_view(), name='currencies-list'),
    path('currencies/<int:pk>/', CurrencyRetrieveUpdateDestroy.as_view(), name='currencies-detail'),
]

