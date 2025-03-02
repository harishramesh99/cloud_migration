
# Security Measures

## Authentication
- Firebase Authentication is used to manage user authentication.
- Session cookies are created and verified to maintain user sessions.

## Authorization
- Middleware functions ensure that only authorized users can access certain routes:
  - `ensureAuthenticated`: Ensures the user is logged in.
  - `ensureAdmin`: Ensures the user has an admin role.
  - `ensureDoctor`: Ensures the user has a doctor role.
  - `ensurePatient`: Ensures the user has a patient role.

## Data Protection
- Sensitive data such as API keys and database URLs are stored in environment variables.
- HTTPS is enforced for secure communication.

## Input Validation
- Body-parser is used to parse incoming request bodies, ensuring they are in the correct format.
- EJS’s <%= %> syntax escapes HTML by default, which helps prevent XSS (Cross-Site Scripting) attacks. This means that values like <%= prescription.data().patient_id %> are automatically encoded.

## Error Handling
- Global error handler catches and logs errors, returning a generic error message to the client.
- 404 error handler renders a custom 404 page for unknown routes.

## Cookie Management
- Cookies are used to store session information securely with the `httpOnly` flag set.

## Database Security
- Firestore rules are configured to restrict access based on user roles and permissions.

## Environment Configuration
- dotenv is used to manage environment variables securely.
- 