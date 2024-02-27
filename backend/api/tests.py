from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import JournalEntryLines, Account, Currency


class JournalEntryLinesViewSetTestCase(APITestCase):
    def setUp(self):
        self.journal_entry = JournalEntryLines.objects.create(
            accounting_date="2023-01-01",
            account="Test Account",
            state="Draft",
            description="Test Description",
            reconciled=False,
            currency="USD",
            amount=100,
            account_type="debit",
        )
        self.detail_url = reverse(
            "journalentrylines-detail", kwargs={"pk": self.journal_entry.pk}
        )
        self.list_url = reverse("journalentrylines-list")

    def test_create_journal_entry_lines(self):
        data = {
            "accounting_date": "2023-01-02",
            "account": "Another Account",
            "state": "Draft",
            "description": "Another Description",
            "reconciled": False,
            "currency": "EUR",
            "amount": 200,
            "account_type": "credit",
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve_journal_entry_lines(self):
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_journal_entry_lines(self):
        data = {
            "accounting_date": "2023-01-02",
            "account": "Updated Account",
            "state": "Booked",
            "description": "Updated Description",
            "reconciled": True,
            "currency": "EUR",
            "amount": 150,
            "account_type": "credit",
        }
        response = self.client.put(self.detail_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_journal_entry_lines(self):
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class AccountViewSetTestCase(APITestCase):
    def setUp(self):
        self.account = Account.objects.create(
            number="1234", name="Test Account", default_accounting_type="debit"
        )
        self.detail_url = reverse("account-detail", kwargs={"pk": self.account.pk})
        self.list_url = reverse("account-list")

    def test_create_account(self):
        data = {
            "number": "5678",
            "name": "Another Account",
            "default_accounting_type": "credit",
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve_account(self):
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_account(self):
        data = {
            "number": "5678",
            "name": "Updated Account",
            "default_accounting_type": "credit",
        }
        response = self.client.put(self.detail_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_account(self):
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class CurrencyViewSetTestCase(APITestCase):
    def setUp(self):
        self.currency = Currency.objects.create(code="USD", name="US Dollar")
        self.detail_url = reverse("currency-detail", kwargs={"pk": self.currency.pk})
        self.list_url = reverse("currency-list")

    def test_create_currency(self):
        data = {"code": "EUR", "name": "Euro"}
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve_currency(self):
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_currency(self):
        data = {"code": "GBP", "name": "British Pound"}
        response = self.client.put(self.detail_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_currency(self):
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
