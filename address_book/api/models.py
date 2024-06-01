from django.db import models

class AddressBookEntry(models.Model):
    """
    Address Book model represents an entry in the address book, storing personal contact details.
    """
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
