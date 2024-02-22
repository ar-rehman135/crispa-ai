from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import JournalEntryLines, Account, Currency
# Add tests for listing JournalEntryLines objects
class JournalEntryLinesAPITestCase(APITestCase):
    def setUp(self):
        self.journal_entry_lines_url = reverse('journal-entry-lines-list')

    def test_create_journal_entry_lines(self):
        data = {
            'accounting_date': '2023-01-01',
            'account': 'Test Account',
            'state': 'Draft',
            'description': 'Test Description',
            'reconciled': False,
            'currency': 'USD',
            'amount': 100,
            'account_type': 'debit'
        }
        response = self.client.post(self.journal_entry_lines_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve_journal_entry_lines(self):
        journal_entry = JournalEntryLines.objects.create(
            accounting_date='2023-01-01',
            account='Test Account',
            state='Draft',
            description='Test Description',
            reconciled=False,
            currency='USD',
            amount=100,
            account_type='debit'
        )
        response = self.client.get(reverse('journal-entry-lines-detail', kwargs={'pk': journal_entry.pk}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_journal_entry_lines(self):
        journal_entry = JournalEntryLines.objects.create(
            accounting_date='2023-01-01',
            account='Test Account',
            state='Draft',
            description='Test Description',
            reconciled=False,
            currency='USD',
            amount=100,
            account_type='debit'
        )
        data = {
            'accounting_date': '2023-01-02',
            'account': 'Updated Account',
            'state': 'Booked',
            'description': 'Updated Description',
            'reconciled': True,
            'currency': 'EUR',
            'amount': 150,
            'account_type': 'credit'
        }
        response = self.client.put(reverse('journal-entry-lines-detail', kwargs={'pk': journal_entry.pk}), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_journal_entry_lines(self):
        journal_entry = JournalEntryLines.objects.create(
            accounting_date='2023-01-01',
            account='Test Account',
            state='Draft',
            description='Test Description',
            reconciled=False,
            currency='USD',
            amount=100,
            account_type='debit'
        )
        response = self.client.delete(reverse('journal-entry-lines-detail', kwargs={'pk': journal_entry.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    
# Add tests for listing Account Testing objects
class AccountAPITestCase(APITestCase):
    def setUp(self):
        self.account_url = reverse('accounts-list')

    def test_create_account(self):
        data = {
            'number': '1234',
            'name': 'Test Account',
            'default_accounting_type': 'debit'
        }
        response = self.client.post(self.account_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve_account(self):
        account = Account.objects.create(
            number='1234',
            name='Test Account',
            default_accounting_type='debit'
        )
        response = self.client.get(reverse('accounts-detail', kwargs={'pk': account.pk}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_account(self):
        account = Account.objects.create(
            number='1234',
            name='Test Account',
            default_accounting_type='debit'
        )
        data = {
            'number': '5678',
            'name': 'Updated Account',
            'default_accounting_type': 'credit'
        }
        response = self.client.put(reverse('accounts-detail', kwargs={'pk': account.pk}), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_account(self):
        account = Account.objects.create(
            number='1234',
            name='Test Account',
            default_accounting_type='debit'
        )
        response = self.client.delete(reverse('accounts-detail', kwargs={'pk': account.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    
    
    # Add tests for listing Currency objects

class CurrencyAPITestCase(APITestCase):
    def setUp(self):
        self.currency_url = reverse('currencies-list')

    def test_create_currency(self):
        data = {
            'code': 'USD',
            'name': 'US Dollar'
        }
        response = self.client.post(self.currency_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve_currency(self):
        currency = Currency.objects.create(
            code='USD',
            name='US Dollar'
        )
        response = self.client.get(reverse('currencies-detail', kwargs={'pk': currency.pk}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_currency(self):
        currency = Currency.objects.create(
            code='USD',
            name='US Dollar'
        )
        data = {
            'code': 'EUR',
            'name': 'Euro'
        }
        response = self.client.put(reverse('currencies-detail', kwargs={'pk': currency.pk}), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_currency(self):
        currency = Currency.objects.create(
            code='USD',
            name='US Dollar'
        )
        response = self.client.delete(reverse('currencies-detail', kwargs={'pk': currency.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)