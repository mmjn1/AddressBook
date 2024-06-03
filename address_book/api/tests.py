from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from api.models import AddressBookEntry
import uuid

# class AddressBookEntryTestCase(APITestCase):
#     def setUp(self):
#         self.create_url = reverse('create_entry')
#         self.entries_url = reverse('get_entries')
#         self.entry_data = {
#             'first_name': 'John',
#             'last_name': 'Doe',
#             'phone_number': '1234567890',
#             'email': 'john@example.com'
#         }
#         self.entry = AddressBookEntry.objects.create(**self.entry_data)
#         self.entry_url = reverse('get_entry', kwargs={'pk': self.entry.pk})
#         self.update_url = reverse('update_entry', kwargs={'pk': self.entry.pk})
#         self.delete_url = reverse('delete_entry', kwargs={'pk': self.entry.pk})
#         self.search_url = reverse('search_entries')  

#     def test_create_entry(self):
#         response = self.client.post(self.create_url, self.entry_data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(AddressBookEntry.objects.count(), 2)
#         self.assertEqual(AddressBookEntry.objects.get(pk=response.data['id']).first_name, 'John')

#     def test_get_entries(self):
#         response = self.client.get(self.entries_url, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 1)
#         self.assertEqual(response.data[0]['first_name'], 'John')

#     def test_get_entry(self):
#         response = self.client.get(self.entry_url, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data['first_name'], 'John')

#     def test_update_entry(self):
#         updated_data = {'first_name': 'Jane'}
#         response = self.client.patch(self.update_url, updated_data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(AddressBookEntry.objects.get(pk=self.entry.pk).first_name, 'Jane')

#     def test_delete_entry(self):
#         response = self.client.delete(self.delete_url, format='json')
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#         self.assertEqual(AddressBookEntry.objects.count(), 0)

#     def test_search_entries(self):
#         # Test searching for an entry by first name
#         response = self.client.get(self.search_url, {'first_name': 'John'}, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 1)
#         self.assertEqual(response.data[0]['first_name'], 'John')


# class AddressBookEntryTestCase(APITestCase):
#     """
#     Test cases for CRUD operations and search functionality on AddressBookEntry model.
#     """

#     def setUp(self):
#         """
#         Given: Necessary URLs and data for the tests are set up.
#         """
#         self.create_url = reverse('create_details')
#         self.entries_url = reverse('get_entries')
#         self.entry_data = {
#             'first_name': 'John',
#             'last_name': 'Doe',
#             'phone_number': '1234567890',
#             'email': 'john@example.com'
#         }
#         self.entry = AddressBookEntry.objects.create(**self.entry_data)
#         self.entry_url = reverse('get_entry', kwargs={'pk': self.entry.pk})
#         self.update_url = reverse('update_details', kwargs={'pk': self.entry.pk})
#         self.delete_url = reverse('delete_details', kwargs={'pk': self.entry.pk})
#         self.search_url = reverse('search_entries')  # New URL for search functionality

#     def test_create_entry(self):
#         """
#         When: Posting data to create an entry.
#         Then: Check if the entry is created with correct data and response status is HTTP 201_CREATED.
#         """
#         response = self.client.post(self.create_url, self.entry_data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(AddressBookEntry.objects.count(), 2)
#         self.assertEqual(AddressBookEntry.objects.get(pk=response.data['id']).first_name, 'John')

#     def test_get_entries(self):
#         """
#         When: Fetching all entries.
#         Then: Check if the response is correct and contains the expected data.
#         """
#         response = self.client.get(self.entries_url, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 1)
#         self.assertEqual(response.data[0]['first_name'], 'John')

#     def test_get_entry(self):
#         """
#         When: Fetching a single entry by primary key.
#         Then: Check if the response is correct and contains the expected data.
#         """
#         response = self.client.get(self.entry_url, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data['first_name'], 'John')

#     def test_update_entry(self):
#         """
#         When: Updating an entry's first name.
#         Then: Check if the update is successful and the first name is changed to 'Jane'.
#         """
#         updated_data = {'first_name': 'Jane'}
#         response = self.client.patch(self.update_url, updated_data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(AddressBookEntry.objects.get(pk=self.entry.pk).first_name, 'Jane')

#     def test_delete_entry(self):
#         """
#         When: Deleting an entry by primary key.
#         Then: Check if the deletion is successful and the entry count is zero.
#         """
#         response = self.client.delete(self.delete_url, format='json')
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#         self.assertEqual(AddressBookEntry.objects.count(), 0)

#     def test_search_entries(self):
#         """
#         When: Searching for an entry by first name.
#         Then: Check if the search returns the correct entry.
#         """
#         response = self.client.get(self.search_url, {'first_name': 'John'}, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 1)
#         self.assertEqual(response.data[0]['first_name'], 'John')


class AddressBookEntryTestCase(APITestCase):
    def setUp(self):
        self.entry_data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'phone_number': '1234567890',
            'email': 'john555@example.com'
        }
        self.entry = AddressBookEntry.objects.create(**self.entry_data)
        self.create_url = reverse('create_details')
        self.entries_url = reverse('get_entries')
        self.entry_url = reverse('get_entry', kwargs={'pk': self.entry.pk})
        self.update_url = reverse('update_details', kwargs={'pk': self.entry.pk})
        self.delete_url = reverse('delete_details', kwargs={'pk': self.entry.pk})
        self.search_url = reverse('search_entries')

    def test_create_entry_missing_fields(self):
        """
        Given: Missing required fields in the entry data,
        When: A POST request is made to create an entry,
        Then: The request fails with a status code of 400_BAD_REQUEST.
        """
        incomplete_data = {'first_name': 'John'}
        response = self.client.post(self.create_url, incomplete_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_entry_nonexistent(self):
        """
        Given: A non-existent primary key,
        When: A GET request is made to retrieve an entry,
        Then: The request fails with a status code of 404_NOT_FOUND.
        """
        nonexistent_entry_url = reverse('get_entry', kwargs={'pk': 999})
        response = self.client.get(nonexistent_entry_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_entry_nonexistent(self):
        """
        Given: A non-existent primary key,
        When: A PATCH request is made to update an entry,
        Then: The request fails with a status code of 404_NOT_FOUND.
        """
        nonexistent_update_url = reverse('update_details', kwargs={'pk': 999})
        updated_data = {'first_name': 'Jane'}
        response = self.client.patch(nonexistent_update_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_entry_nonexistent(self):
        """
        Given: A non-existent primary key,
        When: A DELETE request is made to delete an entry,
        Then: The request fails with a status code of 404_NOT_FOUND.
        """
        nonexistent_delete_url = reverse('delete_details', kwargs={'pk': 999})
        response = self.client.delete(nonexistent_delete_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_search_entries_no_first_name(self):
        """
        Given: No first name parameter in the query,
        When: A GET request is made to search entries,
        Then: The request fails with a status code of 400_BAD_REQUEST.
        """
        response = self.client.get(self.search_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_search_entries_no_results(self):
        """
        Given: A first name that does not match any entries,
        When: A GET request is made to search entries,
        Then: The request succeeds with a status code of 200_OK and an empty list.
        """
        response = self.client.get(self.search_url, {'first_name': 'Nonexistent'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    ################################################################################

    def test_create_entry(self):
        """
        Given: Valid entry data,
        When: A POST request is made to create an entry,
        Then: The entry is created successfully with a status code of 201_CREATED.
        """
        response = self.client.post(self.create_url, self.entry_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AddressBookEntry.objects.count(), 2)
        self.assertEqual(AddressBookEntry.objects.get(pk=response.data['id']).first_name, 'John')

    def test_get_entries(self):
        """
        Given: Entries exist in the database,
        When: A GET request is made to retrieve all entries,
        Then: All entries are retrieved with a status code of 200_OK.
        """
        response = self.client.get(self.entries_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['first_name'], 'John')

    def test_get_entry(self):
        """
        Given: An entry exists with a specific primary key,
        When: A GET request is made to retrieve a single entry,
        Then: The entry is retrieved successfully with a status code of 200_OK.
        """
        response = self.client.get(self.entry_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], 'John')

    def test_update_entry(self):
        """
        Given: Valid updated data,
        When: A PATCH request is made to update an entry,
        Then: The entry is updated successfully with a status code of 200_OK.
        """
        updated_data = {'first_name': 'Jane'}
        response = self.client.patch(self.update_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(AddressBookEntry.objects.get(pk=self.entry.pk).first_name, 'Jane')

    def test_delete_entry(self):
        """
        Given: An entry exists with a specific primary key,
        When: A DELETE request is made to delete the entry,
        Then: The entry is deleted successfully with a status code of 204_NO_CONTENT.
        """
        response = self.client.delete(self.delete_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(AddressBookEntry.objects.count(), 0)

    def test_search_entries(self):
        """
        Given: Entries exist in the database,
        When: A GET request is made to search entries by first name,
        Then: The matching entries are retrieved with a status code of 200_OK.
        """
        response = self.client.get(self.search_url, {'first_name': 'John'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['first_name'], 'John')
