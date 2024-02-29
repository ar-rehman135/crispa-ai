from .mixins import BulkCreateModelMixin
from rest_framework import generics
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

            current_date = base_date + timedelta(days=i * 30)  # Increment by one month

            combined_entry = {
                "id": entry.id,
                "description": entry.description,
                "date": current_date.strftime("%Y-%m-%d"),  # Format date as string
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
    def list(self, request, *args, **kwargs):
        # Fetch data from JournalEntryLines and ForecastTransaction
        combined_data = self.get_combined_data()

        # Combine data into the report format
        report_data = {
            'actual': combined_data['actual'][:24],
            'forecast_scenario_a': combined_data['forecast_scenario_a'].data,
            'forecast_scenario_b': combined_data['forecast_scenario_b'].data,
        }

        return Response(report_data)

    def get_combined_data(self):
        journal_entries_queryset = JournalEntryLines.objects.all()[:24]  # Take only the first 24 entries
        forecast_queryset = ForecastTransaction.objects.all()

        # Generate base date for ascending order
        base_date = datetime(2022, 1, 1)

        # Incremented months for 'actual' entries
        actual_entries = []
        for i, entry in enumerate(journal_entries_queryset):
            current_date = base_date + timedelta(days=i * 30)  # Increment by one month
            entry_data = JournalEntryLinesSerializer(entry).data
            entry_data['accounting_date'] = current_date.strftime("%Y-%m-%d")
            actual_entries.append(entry_data)

        # Filter forecast data for scenarios 'a' and 'b'
        forecast_data_a = forecast_queryset.filter(scenario='a')
        forecast_data_b = forecast_queryset.filter(scenario='b')

        # Serialize data using the serializers
        journal_entries_serializer = JournalEntryLinesSerializer(actual_entries, many=True)
        forecast_serializer_a = ForecastTransactionSerializer(forecast_data_a, many=True)
        forecast_serializer_b = ForecastTransactionSerializer(forecast_data_b, many=True)

        return {
            'actual': journal_entries_serializer.data,
            'forecast_scenario_a': forecast_serializer_a,
            'forecast_scenario_b': forecast_serializer_b,
        }

