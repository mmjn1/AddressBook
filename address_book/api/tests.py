from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from api.models import AddressBookEntry

class AddressBookEntryTestCase(APITestCase):
    def setUp(self):
        self.create_url = reverse('create_entry')
        self.entries_url = reverse('get_entries')
        self.entry_data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'phone_number': '1234567890',
            'email': 'john@example.com'
        }
        self.entry = AddressBookEntry.objects.create(**self.entry_data)
        self.entry_url = reverse('get_entry', kwargs={'pk': self.entry.pk})
        self.update_url = reverse('update_entry', kwargs={'pk': self.entry.pk})
        self.delete_url = reverse('delete_entry', kwargs={'pk': self.entry.pk})
        self.search_url = reverse('search_entries')  

    def test_create_entry(self):
        response = self.client.post(self.create_url, self.entry_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AddressBookEntry.objects.count(), 2)
        self.assertEqual(AddressBookEntry.objects.get(pk=response.data['id']).first_name, 'John')

    def test_get_entries(self):
        response = self.client.get(self.entries_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['first_name'], 'John')

    def test_get_entry(self):
        response = self.client.get(self.entry_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], 'John')

    def test_update_entry(self):
        updated_data = {'first_name': 'Jane'}
        response = self.client.patch(self.update_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(AddressBookEntry.objects.get(pk=self.entry.pk).first_name, 'Jane')

    def test_delete_entry(self):
        response = self.client.delete(self.delete_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(AddressBookEntry.objects.count(), 0)

    def test_search_entries(self):
        # Test searching for an entry by first name
        response = self.client.get(self.search_url, {'first_name': 'John'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['first_name'], 'John')

