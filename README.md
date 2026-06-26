# 📚 Library Management System API

A RESTful Backend API for managing a Library Management System built with **Node.js**, **Express.js**, and **MongoDB**.

The application supports secure authentication using JWT, role-based authorization, book management, member management, and book borrowing/return functionality.

---

# 🚀 Features

## Authentication

- Member Registration
- User Login
- Change Password
- JWT Authentication
- Password Hashing using bcrypt

## Authorization

- Role-Based Access Control
- Librarian Permissions
- Member Permissions

## Book Management

- Add Book
- Get All Books
- Get Book by ID
- Update Book
- Delete Book

## Borrow Management

- Borrow Book
- Return Book
- View My Borrowed Books

## Member Management

- Get All Members
- Delete Member

## Bonus Features

- Pagination
- Search Books
- Category Filter
- Sorting

---

# 🛠️ Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT (JSON Web Token)

### Password Security

- bcrypt

### Validation

- express-validator

### Development Tools

- Nodemon
- Thunder Client / Postman

---

# 📁 Project Structure

```
library-management-system/
│
├── src/
│   ├── config/
│   │      db.js
│   │
│   ├── controllers/
│   │      authController.js
│   │      bookController.js
│   │      memberController.js
│   │
│   ├── middleware/
│   │      authMiddleware.js
│   │      roleMiddleware.js
│   │      errorMiddleware.js
│   │
│   ├── models/
│   │      User.js
│   │      Book.js
│   │      Borrow.js
│   │
│   ├── routes/
│   │      authRoutes.js
│   │      bookRoutes.js
│   │      memberRoutes.js
│   │      testRoutes.js
│   │
│   ├── validators/
│   │      authValidator.js
│   │      bookValidator.js
│   │
│   └── utils/
│          generateToken.js
│
├── app.js
├── server.js
├── .env
├── package.json
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <your-github-repository-url>
```

```bash
cd library-management-system
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Run Development Server

```bash
npm run dev
```

---

## Run Production Server

```bash
npm start
```

---

# 🔐 Authentication

Users receive a JWT token after successful login.

Pass the token in the Authorization header.

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 📚 API Endpoints

## Authentication

| Method | Endpoint | Access |
|---------|----------|--------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| PUT | /api/auth/change-password | Member/Librarian |

---

## Books

| Method | Endpoint | Access |
|---------|----------|--------|
| POST | /api/books | Librarian |
| GET | /api/books | Authenticated |
| GET | /api/books/:id | Authenticated |
| PUT | /api/books/:id | Librarian |
| DELETE | /api/books/:id | Librarian |

---

## Borrow

| Method | Endpoint | Access |
|---------|----------|--------|
| POST | /api/books/:id/borrow | Member |
| POST | /api/books/:id/return | Member |

---

## Members

| Method | Endpoint | Access |
|---------|----------|--------|
| GET | /api/members | Librarian |
| DELETE | /api/members/:id | Librarian |
| GET | /api/members/me/books | Member |

---

# 📖 Query Parameters

## Pagination

```
GET /api/books?page=1&limit=5
```

---

## Search

```
GET /api/books?search=atomic
```

---

## Category Filter

```
GET /api/books?category=Programming
```

---

## Sorting

Ascending

```
GET /api/books?sortBy=title&order=asc
```

Descending

```
GET /api/books?sortBy=createdAt&order=desc
```

---

# 🧪 API Testing

The APIs can be tested using:

- Thunder Client
- Postman

---

# 📮 Postman Collection

A Postman collection is included with the project for testing all API endpoints.

---

# 🌐 Deployment

The application can be deployed on:

- Render

---

# 👨‍💻 Author

**Om Prakash Karri**

Backend Developer
