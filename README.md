

# ILC Project

This project contains the frontend and backend code for the ILC-web application.

## Frontend (ILC-Frontend)

The frontend is built using [React](https://reactjs.org/). It interacts with the backend to provide a user-friendly interface for the ILC application.

### Installation

1. Navigate to the frontend directory:
   ```sh
   cd ilc-frnd
   ```

2. Install all required packages:
   ```sh
   npm install
   ```

### Running the Frontend

To run the frontend locally, use:
   ```sh
   npm start
   ```

The frontend will be accessible at `http://localhost:3000`.

## Backend (ILC-Backend)

The backend provides the API and server-side logic for the ILC application. It is built using [Python](https://www.python.org/) and Django.

### Installation

1. Navigate to the backend directory:
   ```sh
   cd ilc-bcnd
   ```

2. Install all required Python packages:
   ```sh
   pip install -r requirements.txt
   ```

### Running the Backend

To run the backend server locally, use:
   ```sh
   python manage.py runserver
   ```

The backend server will start and listen for requests.

## Notes

- Make sure to configure any environment variables or database connections as needed in both frontend and backend configurations.
- Ensure both frontend and backend servers are running concurrently to use the ILC application seamlessly.



