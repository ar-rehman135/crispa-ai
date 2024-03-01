import random
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from api.models import JournalEntryLines, ForecastTransaction


class Command(BaseCommand):
    help = 'Generate fake transactions for testing purposes'

    def handle(self, *args, **kwargs):
        # Delete old data
        JournalEntryLines.objects.all().delete()
        ForecastTransaction.objects.all().delete()

        # Current date
        current_date = datetime.now()

        # Start date for actual transactions (12 months ago from today)
        start_date_actual = current_date - timedelta(days=365)
        end_date_actual = current_date

        # Start date for forecast transactions (where actual ends)
        start_date_forecast = end_date_actual + timedelta(days=1)
        end_date_forecast = start_date_forecast + \
            timedelta(days=730)  # Forecast for 24 months

        # Generate actual transactions (12 months)
        self.generate_transactions(
            start_date_actual, end_date_actual, 'booked', 'Actual Transaction', JournalEntryLines, 12)

        # Generate forecast transactions for scenario A (24 months)
        self.generate_transactions(start_date_forecast, end_date_forecast,
                                   'draft', 'Forecast Transaction', ForecastTransaction, 24, 'a')

        # Generate forecast transactions for scenario B (24 months)
        self.generate_transactions(start_date_forecast, end_date_forecast,
                                   'draft', 'Forecast Transaction', ForecastTransaction, 24, 'b')

        self.stdout.write(self.style.SUCCESS(
            'Successfully generated fake transactions'))

    def generate_transactions(self, start_date, end_date, state, description_prefix, model, count, scenario=None):
        # Loop through each month
        current_date = start_date
        while current_date <= end_date and count > 0:
            # Create the transaction
            if model == JournalEntryLines:  # Check if the model is JournalEntryLines
                model.objects.create(
                    accounting_date=current_date,
                    account='Bank Account',
                    state=state,
                    description=f"{description_prefix}",
                    reconciled=True if state == 'booked' else False,
                    currency='EUR',
                    amount=random.randint(100, 5000),
                    # Assuming state 'booked' is debit, else credit
                    account_type='debit' if state == 'booked' else 'credit',
                )
            elif model == ForecastTransaction:  # Check if the model is ForecastTransaction
                model.objects.create(
                    accounting_date=current_date,
                    scenario=scenario,
                    account='Bank Account',
                    state=state,
                    description=f"{description_prefix}",
                    reconciled=True if state == 'booked' else False,
                    currency='EUR',
                    amount=random.randint(100, 5000),
                    # Assuming state 'booked' is debit, else credit
                    account_type='debit' if state == 'booked' else 'credit',
                )

            # Move to the next month
            current_date += timedelta(days=30)
            count -= 1
