from .models import Account, JournalEntryLines, Currency
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
