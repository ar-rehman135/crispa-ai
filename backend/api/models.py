from django.db import models
import uuid
from django.utils.translation import gettext_lazy as _

ACCOUNT_TYPE_CHOICES = [
    ("debit", "Debit"),
    ("credit", "Credit"),
]

SCENARIO_CHOICES = [
    ('a', 'Scenario A'),
    ('b', 'Scenario B'),
]


class JournalEntryLines(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    accounting_date = models.DateField(auto_now=False, auto_now_add=False)
    account = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    reconciled = models.BooleanField()
    currency = models.CharField(max_length=50)
    amount = models.IntegerField()
    account_type = models.CharField(
        max_length=20, choices=ACCOUNT_TYPE_CHOICES)

    class Meta:
        verbose_name = _("JournalEntryLine")
        verbose_name_plural = _("JournalEntryLines")

    def __str__(self):
        return self.account


# Other fields of the UserProfile model
class Account(models.Model):
    number = models.CharField(max_length=4)
    name = models.CharField(max_length=50)
    default_accounting_type = models.CharField(
        max_length=20, choices=ACCOUNT_TYPE_CHOICES
    )

    class Meta:
        verbose_name = _("Account")
        verbose_name_plural = _("Account")

    def __str__(self):
        return self.name


class Currency(models.Model):
    code = models.CharField(max_length=3)
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = _("Currency")
        verbose_name_plural = _("Currency")

    def __str__(self):
        return self.name


class ForecastTransaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    accounting_date = models.DateField(auto_now=False, auto_now_add=False)
    scenario = models.CharField(max_length=25, choices=SCENARIO_CHOICES)
    account = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    reconciled = models.BooleanField()
    currency = models.CharField(max_length=50, default='EUR')
    amount = models.IntegerField()
    account_type = models.CharField(
        max_length=20, choices=ACCOUNT_TYPE_CHOICES)

    class Meta:
        verbose_name = _("ForecastTransaction")
        verbose_name_plural = _("ForecastTransactions")

    def __str__(self):
        return f"{self.account} - {self.scenario}"
