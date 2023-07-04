# Notes App Documentation

## Introduction

Welcome to the Notes App documentation! This document provides an overview of the features, functionalities, and usage instructions for the Notes App.

The Notes App is a web application designed to help users keep their notes organized and easily accessible. It offers a secure platform for users to register, login, and manage their notes efficiently. With features like note creation, update, deletion, and reading, the Notes App aims to enhance productivity and streamline the note-taking process.

## Table of Contents

Technologies Used
Installation
Usage
Features
Security
Contributing
Support

1. Technologies Used
   The Notes App is built using the following technologies:

Front-end:

React.js: A JavaScript library for building user interfaces.
HTML5: The latest version of the Hypertext Markup Language.
CSS3: A stylesheet language used for presentation and styling.
Back-end:

Node.js: A runtime environment for executing JavaScript code outside of a browser.
Express.js: A web application framework for Node.js.
MongoDB: A NoSQL database for storing data.
Mongoose: An object data modeling (ODM) library for MongoDB.

2. Installation
   To set up the Notes App locally, follow these steps:

Clone the GitHub repository:

git clone https://github.com/manojvaishnav/Notes-App-MERN.git
Navigate to the project directory:

cd Notes-App-MERN
Install the dependencies:

npm install
Configure the environment variables:

Create a .env file in the root directory.
Add the following environment variables:

PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>
Start the development server:

npm start
Access the Notes App on http://localhost:3000 in your web browser.

3. Usage
   Once the Notes App is up and running, you can perform the following actions:

Register a new account by providing your email and password.
Login using your registered email and password.
Create a new note by clicking on the "New Note" button and providing the necessary details.
Update a note by selecting it from the list and making the desired changes.
Delete a note by selecting it from the list and confirming the deletion.
Read a note by selecting it from the list to view its details.

4. Features
   The Notes App offers the following features:

User Registration: Users can register with a valid email and password.
User Login: Registered users can securely log into their accounts.
Note Creation: Users can create new notes by providing a title and content.
Note Update: Users can edit and update their existing notes.
Note Deletion: Users can delete unwanted notes.
Note Reading: Users can view the details of a selected note.

5. Security
   The Notes App prioritizes the security of user data with the following measures:

Password Encryption: User passwords are stored in an encrypted format, ensuring their confidentiality.
Secure Authentication: User authentication is implemented using industry-standard security practices to prevent unauthorized access.
Environment Variables: Sensitive information, such as database connection strings and secret keys, are stored in environment variables for added security.

6. Contributing
   Contributions to the Notes App project are welcome! If you'd like to contribute, please follow these steps:

Fork the repository on GitHub.
Create a new branch for your feature or bug fix.
Make your changes and commit them with descriptive messages.
Push your changes to your forked repository.
Submit a pull request, explaining your changes and their purpose.

7. Support
   If you encounter any issues, have questions, or need support related to the Notes App, please feel free to contact the project owner or raise an issue on the GitHub repository.
