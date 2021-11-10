# Backend-Task-Node.js
Authentication:
- Login and sign up
- Authorization token (JWT)

User:
- Model with email (Unique), Password (hash), First name and Last name.

Logic:
- Create an authorized endpoint for fetching a random joke. Jokes consist of the user's
name and last name.
- API url: http://www.icndb.com/api/
- The user should receive mail with joke (nodemailer).

Database:
- Postgres

.env:
PORT
DB_USERNAME
DB_PASSWOR
DB_HOST
TOKEN_KEY
EMAIL
EMAIL_PASSWORD
