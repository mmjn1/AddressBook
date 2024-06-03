from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import AddressBookEntry
from .serializers import AddressBookEntrySerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes



"""
This module defines the views for the Address Book API. 
It includes views to create, update, and delete address book entries.
Each view is associated with a specific HTTP method and endpoint, 
and uses serializers to validate and serialize the data.
"""


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def create_entry(request):
    """
    Create a new address book entry.
    Validates the data and saves it if valid, otherwise returns an error.
    """
    if request.method == 'POST':
        serializer = AddressBookEntrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_entries(request):
    """
    Retrieves all address book entries.
    """
    if request.method == 'GET':
        entries = AddressBookEntry.objects.all()
        serializer = AddressBookEntrySerializer(entries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_entry(request, pk):
    """
    Retrieve a single address book entry by its primary key (pk).
    """
    try:
        entry = AddressBookEntry.objects.get(pk=pk)
    except AddressBookEntry.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = AddressBookEntrySerializer(entry)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
    
@csrf_exempt
@api_view(['PATCH'])
@permission_classes([AllowAny])
def update_entry(request, pk):
    """
    Update an existing address book entry identified by the primary key (pk).
    Partial updates are allowed. If the entry does not exist, returns a 404 error.
    """
    try:
        entry = AddressBookEntry.objects.get(pk=pk)
    except AddressBookEntry.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PATCH':
        serializer = AddressBookEntrySerializer(entry, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@csrf_exempt
@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_entry(request, pk):
    """
    Delete an address book entry identified by the primary key (pk).
    If the entry does not exist, returns a 404 error.
    """
    try:
        entry = AddressBookEntry.objects.get(pk=pk)
    except AddressBookEntry.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
