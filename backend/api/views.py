
from rest_framework import generics
from .models import JournalEntryLines, Account, Currency
from .myserializers import *

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








