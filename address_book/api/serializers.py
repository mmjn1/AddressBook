from rest_framework import serializers
from .models import AddressBookEntry

"""
This module defines serializers for the Address Book API. 
It includes a serializer for Address Book entries which is used to validate and serialize data 
for creating, updating, and retrieving address book entries.
"""


class AddressBookEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = AddressBookEntry
        fields = '__all__'