# Generated by Django 3.2.24 on 2024-02-28 15:02

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20240224_1753'),
    ]

    operations = [
        migrations.CreateModel(
            name='ForecastTransaction',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('accounting_date', models.DateField()),
                ('scenario', models.CharField(choices=[('a', 'Scenario A'), ('b', 'Scenario B')], max_length=25)),
                ('account', models.CharField(max_length=50)),
                ('state', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=200)),
                ('reconciled', models.BooleanField()),
                ('currency', models.CharField(default='EUR', max_length=50)),
                ('amount', models.IntegerField()),
                ('account_type', models.CharField(choices=[('debit', 'Debit'), ('credit', 'Credit')], max_length=20)),
            ],
            options={
                'verbose_name': 'ForecastTransaction',
                'verbose_name_plural': 'ForecastTransactions',
            },
        ),
    ]
