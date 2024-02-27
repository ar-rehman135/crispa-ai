from .mixins import BulkCreateModelMixin
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import viewsets
from .models import JournalEntryLines, Account, Currency
from .serializers import *


class JournalEntryLinesViewSet(BulkCreateModelMixin, viewsets.ModelViewSet):
    queryset = JournalEntryLines.objects.all()
    serializer_class = JournalEntryLinesSerializer


class AccountViewSet(BulkCreateModelMixin, viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class CurrencyViewSet(BulkCreateModelMixin, viewsets.ModelViewSet):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer


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
