# Address Book Application

## Overview

This project is an Address Book application that allows users to list, view, add, edit, and delete address book entries. The backend is built with Django and Django REST Framework, while the frontend is built with React.

## Users

The primary users of this application are:
- **General Users:** Can manage their address book entries.

## Getting Started

Follow these instructions to set up the project on your local machine for development and testing purposes. Note that running the entire application will require opening multiple terminal windows to manage different components simultaneously. In total, you should expect to have two terminal windows open.

**Cloning the Repository**

Start by cloning the repository to your local machine using a code editor such as Visual Studio Code:

    git clone https://github.com/mmjn1/AddressBook.git

## Setting up the Backend (Django)

Navigate to the backend directory:

    cd address_book

Create a virtual environment and activate it:

For macOS/Linux:

    python3 -m venv env
    source env/bin/activate

For Windows:

    python -m venv env
    .\env\Scripts\activate 

Install the required Python packages for Django:

    pip install -r requirements.txt

Create a superuser to access the admin panel:

    python manage.py createsuperuser

This will ask for your email, first name, last name, password, and confirm password. 

Apply migrations to create the database schema:

    python manage.py migrate

Run the Django development server:

    python manage.py runserver

Your Django development server will be running at http://127.0.0.1:8000/

You can access the admin panel by adding - http://127.0.0.1:8000/admin in the search bar and then enter your email and password.

## Setting up the Frontend (React)

Create another window on your terminal by clicking the + icon

Navigate to the frontend directory:

    cd ../address-book-frontend

Install the required Node.js packages:

    npm install

Start the React development server:

    npm start

**Accessing the Application**
- **Development Mode:** Open http://localhost:3000 in your browser to view the application.

## Running Tests

### Backend (Django)

1. **Run the unit tests:**
   ```bash
   python manage.py test
