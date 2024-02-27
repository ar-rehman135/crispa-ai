# Crispa Full Stack Test Project Handover

## Running the Project

### Backend:

1. Clone the project repository from your GitHub account.
2. Navigate to the backend directory.
3. Install dependencies using pip:
   pip install -r requirements.txt

4. Apply Django migrations:

python manage.py migrate

5. Start the backend server:

python manage.py runserver

6.  The backend server will be accessible at http://localhost:8000.

7.  Creates endpoints for each model, allowing for both single and bulk creation through POST requests. If you POST a single object (in JSON format) to these endpoints, it will create one instance. If you POST a list of objects, it will create multiple instances in bulk,

    For single creation of an account, you can pass data to the create endpoint like this:

    ```json
    {
      "number": "stri",
      "name": "string",
      "default_accounting_type": "debit"
    }

    For bulk creation of accounts, you can pass an array of objects to the create endpoint:
      [
        {
          "number": "TEST",
          "name": "Name",
          "default_accounting_type": "debit"
        },
        {
          "number": "Tes1",
          "name": "Name 1",
          "default_accounting_type": "debit"
        },
        {
          "number": "Tes2",
          "name": "Name 2",
          "default_accounting_type": "credit"
        }
      ]
    ```

### Frontend:

1. After cloning the project repository, navigate to the frontend directory.
2. Install dependencies using npm or yarn:

npm install or yarn install

3. Once dependencies are installed, start the frontend server with:

npm start or yarn start

4. The frontend will be served at http://localhost:3000.

## Running Tests

### Backend:

To run tests for the backend, execute the following command:
python manage.py test
