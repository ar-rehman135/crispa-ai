from .mixins import BulkCreateModelMixin
from rest_framework import generics,  status
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import viewsets
from .models import JournalEntryLines, Account, Currency
from .serializers import *
from datetime import datetime, timedelta


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
        base_date = datetime(2022, 1, 1)  # Start date for ascending order

        for i in range(min_length):
            entry = journal_entries[i]
            account = accounts[i]
            currency = currencies[i]

            # Increment by one month
            current_date = base_date + timedelta(days=i * 30)

            combined_entry = {
                "id": entry.id,
                "description": entry.description,
                # Format date as string
                "date": current_date.strftime("%Y-%m-%d"),
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

        # Return only the first 24 entries
        response_data = combined_data[:24]

        return Response(response_data)


class CombinedReportView(generics.ListAPIView):
    def get(self, request, *args, **kwargs):
        actual_transactions = JournalEntryLines.objects.all()

        forecast_transactions_a = ForecastTransaction.objects.filter(
            scenario='a')
        forecast_transactions_b = ForecastTransaction.objects.filter(
            scenario='b')

        # Serialize the data
        actual_serializer = JournalEntryLinesSerializer(
            actual_transactions, many=True)
        forecast_serializer_a = ForecastTransactionSerializer(
            forecast_transactions_a, many=True)
        forecast_serializer_b = ForecastTransactionSerializer(
            forecast_transactions_b, many=True)

        # Combine data into the report format
        report_data = {
            'actual': actual_serializer.data,
            'forecast_scenario_a': forecast_serializer_a.data,
            'forecast_scenario_b': forecast_serializer_b.data,
        }

        return Response(report_data, status=status.HTTP_200_OK)
