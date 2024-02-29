import random
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from api.models import ForecastTransaction

class Command(BaseCommand):
    help = 'Generate fake transactions for testing purposes'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Indicates the number of fake transactions to be generated')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        accounts = ['Salary', 'Rent', 'Utilities', 'Office Supplies', 'Sales Revenue', 'Advertising', 'Tax',
                    'Loan Repayment', 'Investments', 'Dividends', 'Insurance', 'Consulting Fees',
                    'Equipment Purchase', 'Membership Dues', 'Interest Income', 'Legal Fees',
                    'Travel Expenses', 'Loan Disbursement', 'Repair & Maintenance', 'Charitable Donations']

        # Delete old data
        ForecastTransaction.objects.all().delete()

        # Start with the current date
        accounting_date = datetime.now()

        for _ in range(total):
            # Randomly choose an account
            account = random.choice(accounts)

            # Determine the account type and description based on the chosen account
            if account in ['Sales Revenue', 'Interest Income', 'Dividends', 'Consulting Fees']:
                account_type = 'credit'
                description = f"Received payment for {account}"
            else:
                account_type = 'debit'
                description = f"Payment for {account}"

            # Create debit entry with scenario 'a'
            ForecastTransaction.objects.create(
                accounting_date=accounting_date,
                account=account,
                state='draft',
                description=description,
                reconciled=False,
                currency='EUR',
                amount=random.randint(100, 5000),
                account_type=account_type,
                scenario='a'
            )

            # Create credit entry with scenario 'b'
            ForecastTransaction.objects.create(
                accounting_date=accounting_date,
                account=random.choice(['Expenses', 'Revenue']),
                state='draft',
                description=f"{account_type.capitalize()} entry for {account}",
                reconciled=False,
                currency='EUR',
                amount=random.randint(100, 5000),
                account_type='credit' if account_type == 'debit' else 'debit',
                scenario='b'
            )

            # Increment the date by one day for the next set of transactions
            accounting_date += timedelta(days=30)

            # Stop after 50 iterations
            if _ >= 50:
                break

        self.stdout.write(self.style.SUCCESS(f'Successfully generated {total} fake transactions'))
