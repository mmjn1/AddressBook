from django.contrib import admin
from .models import AddressBookEntry

@admin.register(AddressBookEntry)
class AddressBookEntryAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'phone_number', 'email')
    search_fields = ('first_name', 'last_name', 'email')
    list_filter = ('first_name', 'last_name')

