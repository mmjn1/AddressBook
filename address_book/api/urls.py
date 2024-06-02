from django.urls import path
from .views import *

"""
This module defines the URL routing for the Address Book API. 
It maps URL patterns to the appropriate views for creating, updating, and deleting address book entries.
"""


urlpatterns = [
    path('create-entry/', create_entry, name='create_details'),
    path('update-entry/<int:pk>/', update_entry, name='update_details'),
    path('delete-entry/<int:pk>/', delete_entry, name='delete_details'),
]