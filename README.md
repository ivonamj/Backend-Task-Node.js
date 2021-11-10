# Backend-Task-Node.js
Authentication:
- Login and sign up
- Authorization token (JWT)

User:
- Model with Email (unique), Password (hash), First name and Last name.

Logic:
- Create an authorized endpoint for fetching a random joke. Jokes consist of the user's first name and last name.
- API url: http://www.icndb.com/api/
- The user should receive mail with joke (nodemailer).

Database:
- Postgres

.env:
PORT, DB_USERNAME, DB_PASSWORD, DB_HOST, TOKEN_KEY, EMAIL, EMAIL_PASSWORD
