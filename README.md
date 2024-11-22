# user-session-management
Overview
This project is a User Session Management System built using Node.js and Express.js. It provides an API to manage user sessions, including the creation of new users, tracking of active sessions, invalidation of old sessions, and notification when a user tries to log in from a new device.

Features:
Create User: Allows you to create a new user, track their sessions, and mark one session as active.
Get User: Fetches user details along with all their sessions, indicating the current active session and the status of previous sessions.
Login (New Session Creation): Allows a user to log in from a new device, invalidating any previous active sessions.
Invalidate Session: Provides an option to manually invalidate any session.
Notify User on Concurrent Sessions: Alerts the user when trying to log in on a new device while an active session exists.
API Endpoints
1. Create User
URL: /createUser 
Method: POST
Request Body:
json
Copy code
{
  "mobile": "9012345678",
  "username": "SavingsBank"
}
Response:
json
Copy code
{
  "message": "User created successfully",
  "user": {
    "mobile": "9012345678",
    "user_name": "SavingsBank",
    "activeSession": "457d87d7-d06b-4f44-90ea-76ac235903b2",
    "sessions": [
      {
        "sessionKey": "ce59ee13c39b640a88a224e15eb3b11b",
        "userAgent": "Thunder Client",
        "ipAddress": "::ffff:127.0.0.1",
        "isValid": false,
        "createdAt": "2024-11-22T10:32:10.469Z"
      },
      {
        "sessionKey": "457d87d7-d06b-4f44-90ea-76ac235903b2",
        "userAgent": "Thunder Client",
        "ipAddress": "::ffff:127.0.0.1",
        "isValid": true,
        "createdAt": "2024-11-22T10:45:47.209Z"
      }
    ]
  }
}
### create User
![create user](screenshots/Screenshot%20(59).png)
2. Get User Details
URL: /user/{mobile}
Method: GET
Request Parameters: mobile (Mobile number of the user)
Response:
json
Copy code
{
  "mobile_number": "9012345678",
  "user_name": "SavingsBank",
  "activeSession": "457d87d7-d06b-4f44-90ea-76ac235903b2",
  "sessions": [
    {
      "sessionKey": "ce59ee13c39b640a88a224e15eb3b11b",
      "userAgent": "Thunder Client",
      "ipAddress": "::ffff:127.0.0.1",
      "isValid": false,
      "createdAt": "2024-11-22T10:32:10.469Z"
    },
    {
      "sessionKey": "457d87d7-d06b-4f44-90ea-76ac235903b2",
      "userAgent": "Thunder Client",
      "ipAddress": "::ffff:127.0.0.1",
      "isValid": true,
      "createdAt": "2024-11-22T10:45:47.209Z"
    }
  ]
} 
### getUserDetails
![Get User details](screenshots/Screenshot%20(60).png) 
![Get User details](screenshots/Screenshot%20(61).png)
3. Login (Create New Session)
URL: /login
Method: POST
Request Body:
json
Copy code
{
  "mobile": "9012345678",
  "username": "SavingsBank",
  "userAgent": "Thunder Client",
  "ipAddress": "::ffff:127.0.0.2"
}
Response:
json
Copy code
{
  "message": "There is already a session up and running. Please log out and log in again.",
  "user": {
    "mobile": "9012345678",
    "user_name": "SavingsBank",
    "activeSession": "457d87d7-d06b-4f44-90ea-76ac235903b2",
    "sessions": [
      {
        "sessionKey": "ce59ee13c39b640a88a224e15eb3b11b",
        "userAgent": "Thunder Client",
        "ipAddress": "::ffff:127.0.0.1",
        "isValid": false,
        "createdAt": "2024-11-22T10:32:10.469Z"
      },
      {
        "sessionKey": "457d87d7-d06b-4f44-90ea-76ac235903b2",
        "userAgent": "Thunder Client",
        "ipAddress": "::ffff:127.0.0.2",
        "isValid": true,
        "createdAt": "2024-11-22T10:45:47.209Z"
      }
    ]
  }
}
4. Invalidate Session
URL: /invalidateSession
Method: POST
Request Body:
json
Copy code
{
  "sessionKey": "ce59ee13c39b640a88a224e15eb3b11b"
}
Response:
json
Copy code
{
  "message": "Session invalidated successfully.",
  "user": {
    "mobile": "9012345678",
    "user_name": "SavingsBank",
    "activeSession": "457d87d7-d06b-4f44-90ea-76ac235903b2",
    "sessions": [
      {
        "sessionKey": "ce59ee13c39b640a88a224e15eb3b11b",
        "userAgent": "Thunder Client",
        "ipAddress": "::ffff:127.0.0.1",
        "isValid": false,
        "createdAt": "2024-11-22T10:32:10.469Z"
      },
      {
        "sessionKey": "457d87d7-d06b-4f44-90ea-76ac235903b2",
        "userAgent": "Thunder Client",
        "ipAddress": "::ffff:127.0.0.2",
        "isValid": true,
        "createdAt": "2024-11-22T10:45:47.209Z"
      }
    ]
  }
}
Requirements
Node.js: >= 14.x
Express.js: ^4.17.1
MongoDB: Database for storing user data and session information.
Installation
Clone the repository.

bash
Copy code
git clone <repository_url>
Install dependencies:

bash
Copy code
npm install
Start the server:

bash
Copy code
npm start
The server will be running on http://localhost:3000.

Testing API
You can use tools like Thunder Client or Postman to test the API.

