# CreditSea Fullstack Application

This is a fullstack web application built with the MERN stack (MongoDB, Express, React, Node.js) designed for CreditSea.

## Prerequisites

Before setting up the project, ensure that you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (local or MongoDB Atlas)

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```sh
git clone https://github.com/saquibe/creditSea_Fullstack.git
cd creditSea_Fullstack
```

### 2. Install Dependencies

For the API:
Navigate to the api directory and install the dependencies:

```sh
cd api
npm install
```

For the Client:
Navigate to the client directory and install the dependencies:

```sh
cd client
npm install
```

### 3. Configure Environment Variables

Create a .env file in the api directory with the following content:

````sh

```sh
MONGO_URI="mongodb+srv://saquibe:742422.era@mern-blog.2h93byb.mongodb.net/creditsea?retryWrites=true&w=majority&appName=mern-blog"
````

Make sure to replace the credentials and connection string with your own MongoDB URI if necessary.

## Run Instructions

Ensure that your MongoDB server is running (locally or remotely).

If using MongoDB Atlas, make sure the URI in your .env file is correct.

If running locally, start the MongoDB server with the following command:

mongod

### 2. Run the API Server

Navigate to the api directory and start the server:

```sh
cd api
npm start
```

The API server will be running on the default port (usually http://localhost:5000).

### 3. Run the Client Application

Navigate to the client directory and start the client application:

sh
Copy
Edit

```sh
cd client
npm start
```

The client application will be running on http://localhost:3000.

## Access the Application

Once both the API server and client are running, open your browser and navigate to http://localhost:3000 to access the application.
