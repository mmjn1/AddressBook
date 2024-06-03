from django.urls import path
from .views import *

"""
This module defines the URL routing for the Address Book API. 
It maps URL patterns to the appropriate views for creating, updating, and deleting address book entries.
"""


urlpatterns = [
    path('create-entry/', create_entry, name='create_details'),
    path('get-entries/', get_entries, name='get_entries'),
    path('fetch-entry/<int:pk>/', get_entry, name='get_entry'),
    path('update-entry/<int:pk>/', update_entry, name='update_details'),
    path('delete-entry/<int:pk>/', delete_entry, name='delete_details'),
    path('search-entries/', search_entries, name='search_entries'),  

]