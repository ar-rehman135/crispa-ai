from datetime import datetime, timedelta
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema


class JournalEntryLinesListCreate(generics.ListCreateAPIView):
    queryset = JournalEntryLines.objects.all()
    serializer_class = JournalEntrySerializer


class JournalEntryLinesRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = JournalEntryLines.objects.all()
    serializer_class = JournalEntrySerializer


class AccountListCreate(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializers


class AccountRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializers


class CurrencyListCreate(generics.ListCreateAPIView):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializers


class CurrencyRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializers


class CombinedListView(generics.ListAPIView):
    def list(self, request, *args, **kwargs):
        journal_entries = JournalEntryLines.objects.all()
        accounts = Account.objects.all()
        currencies = Currency.objects.all()
        min_length = min(len(journal_entries), len(accounts), len(currencies))

        combined_data = []
        for i in range(min_length):
            entry = journal_entries[i]
            account = accounts[i]
            currency = currencies[i]

            combined_entry = {
                "id": entry.id,
                "description": entry.description,
                "date": entry.accounting_date,
                "account": entry.account,
                "amount": entry.amount,
                "type": entry.account_type,
                "currency": entry.currency,
                "convertedCurrency": currency.code,
                "defaultType": account.default_accounting_type,
                "status": entry.state,
                "reconciled": entry.reconciled,
            }
            combined_data.append(combined_entry)

        return Response(combined_data)
