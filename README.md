Recipe App

This is a simple web application for managing and sharing recipes. It consists of a frontend built with Next.js and a backend built with Express.js.
Features

    User authentication
    Recipe creation, editing, and deletion
    Recipe browsing and searching
    ...

Installation
Prerequisites

Before you begin, ensure you have the following installed:

    Node.js and npm
    MongoDB

Backend Setup

    Clone the repository:

bash

git clone <repository-url>
cd backend

    Install dependencies:

bash

npm install

    Set up environment variables:

Create a .env file in the root directory of the backend folder and add the following variables:

makefile

PORT=5000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>

    Run the backend server:

bash

npm start

Frontend Setup

    Navigate to the frontend directory:

bash

cd ../frontend

    Install dependencies:

bash

npm install

    Set up environment variables:

Create a .env.local file in the root directory of the frontend folder and add the following variable:

arduino

NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

Replace http://localhost:5000 with the URL of your backend server if it's hosted elsewhere.

    Run the frontend development server:

bash

npm run dev

Usage

Open your browser and navigate to http://localhost:3000 to access the recipe app.
