# Users list

Small Angular application to demonstrate working with Angular, NgRx, and a mock server using json-server.  
The app fetches and displays a paginated list of users, with functionality to delete a user and reload the user list after deletion.

## Backend Mock Server

In the root folder there is a `db.json` with mock data.

```bash
# Install the json-server package globally.
$ npm install -g json-server

# Start the mock server.
$ json-server --watch db.json
```

## Frontend

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
