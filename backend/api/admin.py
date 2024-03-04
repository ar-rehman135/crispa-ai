from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(JournalEntryLines)
admin.site.register(Account)
admin.site.register(Currency)
admin.site.register(ForecastTransaction)

