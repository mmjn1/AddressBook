from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from api.models import AddressBookEntry

class AddressBookEntryFailureTestCase(APITestCase):
    def setUp(self):
        self.create_url = reverse('create_details')
        self.entries_url = reverse('get_entries')
        self.entry_data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'phone_number': '1234567890',
            'email': 'john@example.com'
        }
        self.entry = AddressBookEntry.objects.create(**self.entry_data)
        self.entry_url = reverse('get_entry', kwargs={'pk': self.entry.pk})
        self.update_url = reverse('update_details', kwargs={'pk': self.entry.pk})
        self.delete_url = reverse('delete_details', kwargs={'pk': self.entry.pk})
        self.search_url = reverse('search_entries')

    def test_create_entry_with_invalid_data(self):
        """
        Given: Invalid entry data,
        When: A POST request is made to create an entry,
        Then: The request fails with a status code of 201_CREATED (should be 400_BAD_REQUEST).
        """
        invalid_data = {'first_name': ''}
        response = self.client.post(self.create_url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)  # This should fail

    def test_get_nonexistent_entries(self):
        """
        Given: No entries in the database,
        When: A GET request is made to retrieve all entries,
        Then: The request succeeds with a status code of 200_OK and non-empty data (should be empty).
        """
        AddressBookEntry.objects.all().delete()
        response = self.client.get(self.entries_url, format='json')
        self.assertNotEqual(len(response.data), 0)  # This should fail

    def test_update_nonexistent_entry(self):
        """
        Given: A non-existent primary key,
        When: A PATCH request is made to update an entry,
        Then: The request succeeds with a status code of 200_OK (should be 404_NOT_FOUND).
        """
        nonexistent_update_url = reverse('update_details', kwargs={'pk': 999})
        updated_data = {'first_name': 'Jane'}
        response = self.client.patch(nonexistent_update_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)  # This should fail

    def test_delete_nonexistent_entry(self):
        """
        Given: A non-existent primary key,
        When: A DELETE request is made to delete the entry,
        Then: The request succeeds with a status code of 204_NO_CONTENT (should be 404_NOT_FOUND).
        """
        nonexistent_delete_url = reverse('delete_details', kwargs={'pk': 999})
        response = self.client.delete(nonexistent_delete_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)  # This should fail

    def test_search_entries_with_invalid_parameter(self):
        """
        Given: An invalid query parameter,
        When: A GET request is made to search entries,
        Then: The request succeeds with a status code of 200_OK (should be 400_BAD_REQUEST).
        """
        response = self.client.get(self.search_url, {'invalid_param': 'John'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)  # This should fail