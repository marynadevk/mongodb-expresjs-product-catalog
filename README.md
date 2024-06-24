# Product catalog

This project is divided into two main parts: the frontend and the backend. It utilizes a combination of modern technologies to deliver a full-stack application.

## Frontend

The frontend of the project is built with **React** using **TypeScript**. React's component-based architecture, combined with TypeScript's strong typing, provides a robust framework for building interactive user interfaces.

### Key Technologies

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **React Router**: For navigation and routing in the application.


## Backend

The backend is developed using **Express** and **MongoDB**. Express provides a minimal and flexible Node.js web application framework that offers a robust set of features for web and mobile applications. MongoDB, a NoSQL database, is used for storing the application's data.

### Key Technologies

- **Express**: A web application framework for Node.js, designed for building web applications and APIs.
- **MongoDB**: A NoSQL database that uses a document-oriented data model.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
  ```sh
  git clone https://github.com/your_username_/Project-Name.git
  ```

2. Install NPM packages for the backend
 ```sh
cd backend
npm install
```

3. Install NPM packages for the frontend
 ```sh
cd ../frontend
npm install
```

4. Create a .env file in the backend directory and add your MongoDB URL
 ```sh
DATABASE_URL=your_mongodb_url
PORT=${PORT_VALUE}
```
5. Start the backend server
 ```sh
npm start
```
6. Create a .env file in the frontend directory and add your API URL
 ```sh
VITE_API_URL=your_api_url
```

7. Start the frontend application
 ```sh
cd ../frontend
npm start
```

### Usage
After starting both the frontend and backend, you can access the application by navigating to http://localhost:5173 in your browser.


### API Endpoints

Route | Method | Description | Authentication
--- | --- | --- | ---
`/products` | `GET` | Get all products | No
`/products/:id` | `GET` | Get a single product by ID | No
`/products` | `POST` | Add a new product | Yes
`/products/:id` | `DELETE` | Delete a product by ID | Yes
`/products/:id` | `PATCH` | Update a product by ID | Yes
`/login` | `POST` | Authenticate a user (login) | No
`/signup` | `POST` | Register a new user (signup) | No
