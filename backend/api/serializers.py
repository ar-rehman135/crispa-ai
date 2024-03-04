from .models import Account, JournalEntryLines, Currency, ForecastTransaction
from rest_framework import serializers


class JournalEntryLinesSerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntryLines
        fields = "__all__"


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = "__all__"


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = "__all__"


class CombinedSerializer(serializers.Serializer):
    JournalEntryLine = JournalEntryLinesSerializer()
    Account = AccountSerializer()
    Currency = CurrencySerializer()


class ForecastTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForecastTransaction
        fields = "__all__"

class CombinedReportSerializer(serializers.Serializer):
    actual = serializers.ListSerializer(child=CombinedSerializer())
    forecast = serializers.ListSerializer(child=ForecastTransactionSerializer())