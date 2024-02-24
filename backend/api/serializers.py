from .models import Account, JournalEntryLines, Currency
from rest_framework import serializers


class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntryLines
        fields = "__all__"


class AccountSerializers(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = "__all__"


class CurrencySerializers(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = "__all__"


class CombinedSerializer(serializers.Serializer):
    JournalEntryLine = JournalEntrySerializer()
    Account = AccountSerializers()
    Currency = CurrencySerializers()
