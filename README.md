# Blog Management System

## Student Details

**Name:** Vishwa Patel
**Enrollment No.:** 251263116014

## Problem Statement

The Blog Management System is a web application that allows users to register, login, create blog posts, edit and delete their own posts, view posts, and add comments. The system provides secure authentication and a simple, responsive interface for managing blog content.

## Technology Stack

* **Frontend:** React.js, Vite, React Router, Axios, CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Authentication:** JWT and bcryptjs
* **Deployment:** Vercel and Render
* **API Testing:** Postman
* **Version Control:** Git and GitHub

## Main Features

* User Registration and Login
* JWT-based Authentication
* Protected Routes
* Create Blog Post
* View All Blog Posts
* View Individual Blog Post
* Edit Own Blog Posts
* Delete Own Blog Posts
* Add Comments
* My Posts Dashboard
* Responsive User Interface
* Loading and Empty States
* Error Handling using Alerts
* MongoDB Atlas Database

## API Documentation

| Method | Endpoint                  | Description         | Authentication |
| ------ | ------------------------- | ------------------- | -------------- |
| POST   | `/api/auth/register`      | Register a new user | No             |
| POST   | `/api/auth/login`         | Login user          | No             |
| GET    | `/api/posts`              | Get all posts       | No             |
| GET    | `/api/posts/:id`          | Get single post     | No             |
| POST   | `/api/posts`              | Create a post       | JWT            |
| PUT    | `/api/posts/:id`          | Update own post     | JWT            |
| DELETE | `/api/posts/:id`          | Delete own post     | JWT            |
| POST   | `/api/posts/:id/comments` | Add a comment       | JWT            |

## Project Structure

```text
blog-management-system/
│
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── posts.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── .gitignore
└── README.md
```

## How to Run Locally

### Backend

```bash
cd backend
npm install
npm start
```

Backend runs on:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Live Demo

**Frontend:**
https://blog-management-system-7juqm8kir-vishwapatel0507-arch.vercel.app

**Backend:**
https://blogsphere-backend-znsv.onrender.com

## GitHub Repository

https://github.com/vishwapatel0507-arch/blog-management-system

## Conclusion

The Blog Management System successfully implements a full-stack web application using React, Node.js, Express, and MongoDB. It provides authentication, protected routes, CRUD operations for blog posts, comments, API integration, and online deployment.
