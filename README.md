# TaskFlow — Backend

TaskFlow is a full-stack project and task management application designed to help teams organize projects, assign collaborators, and track task progress.

The backend provides a REST API responsible for authentication, authorization, project and task management, team management, validation, and database operations.

🌐 **Live Demo:** https://task-front-wheat.vercel.app/

🔗 **Frontend Repository:** [TaskFlow Frontend](https://github.com/JahirML/task-front)

## 🚀 Features

### Authentication & Authorization

* User registration and login.
* JWT-based authentication.
* Password hashing with bcrypt.
* Role-based authorization.
* Protected routes and resources.
* Account confirmation through email.
* Password recovery through email.

### Project Management

Each project belongs to a single manager and can contain multiple collaborators.

Managers can:

* Create projects.
* Edit project information.
* Delete projects.
* Add registered users to the project team.
* Create tasks within their projects.

### Task Management

Tasks belong to a specific project and can only be created by the project's manager.

Tasks include:

* Task information.
* Current status.
* Project reference.
* Creation date.
* Last update date.
* Status change history.
* Associated notes.

Collaborators can update task statuses and interact with tasks within projects they belong to.

### Notes

Tasks can have multiple notes.

Each note stores:

* The task it belongs to.
* The project it belongs to.
* The user who created the note.
* The note content.

This allows the application to keep track of which user added each note.

### Task History

The application records task status changes, including the user responsible for the change.

This provides a history of task progress and allows the team to see how a task moved between different statuses.

### Email Verification & Password Recovery

The backend provides email-based account functionality.

When a user creates an account, a confirmation email is sent containing a temporary token.

The same token system is used for password recovery.

Tokens are:

* Associated with a specific user.
* Temporary.
* Valid for 15 minutes.
* Deleted after being successfully used.

## 🏗️ Architecture

The backend follows the **MVC (Model-View-Controller)** architecture.

```text
src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
└── ...
```

### Controllers

Handle application logic and coordinate requests between routes, models, and services.

### Models

Define the application's MongoDB data structures using Mongoose.

The backend currently contains five main models:

* **User** — Stores user information, credentials, and account confirmation status.
* **Project** — Stores project information, manager, team members, and associated tasks.
* **Task** — Stores task information, project reference, status, and task history.
* **Note** — Stores notes associated with a task, project, and user.
* **Token** — Stores temporary tokens used for account confirmation and password recovery.

### Middleware

The application uses middleware to handle responsibilities such as:

* JWT authentication.
* Project validation and retrieval.
* Task validation and retrieval.
* Request validation.
* Authorization and protected resources.

For example, project middleware verifies that a project exists and makes the project available through the request before reaching the controller.

## 🔗 Data Relationships

The main relationships between the models are:

```text
User
 └── has many Projects

Project
 ├── belongs to one Manager (User)
 ├── has many Team Members (User)
 └── has many Tasks

Task
 ├── belongs to one Project
 └── has many Notes

Note
 ├── belongs to one Task
 ├── belongs to one Project
 └── belongs to one User

Token
 └── belongs to one User
```

## 🔐 JWT Authentication

After successful authentication, the backend generates a JWT containing the authenticated user's information.

Protected endpoints require a valid JWT.

The backend verifies the token before allowing access to protected resources, while role-based middleware and controller logic ensure that users can only perform actions allowed by their role.

The frontend stores the JWT in `localStorage` and sends it with requests to protected endpoints.

## 🛡️ Validation & Security

The backend implements several security and validation mechanisms:

* Password hashing with **bcrypt**.
* JWT authentication.
* Role-based authorization.
* Request validation using **Express Validator**.
* Protected routes.
* Temporary tokens with expiration.
* Password confirmation for sensitive project deletion operations.
* CORS configuration.
* Environment variables for sensitive configuration.

## 🛠️ Technologies

### Backend

* **Node.js** — Runtime environment.
* **Express** — REST API framework.
* **MongoDB** — Database.
* **Mongoose** — ODM used to define models and interact with MongoDB.
* **JSON Web Token (JWT)** — Authentication and authorization.
* **bcrypt** — Password hashing.
* **Express Validator** — Request validation.
* **Morgan** — HTTP request logging.
* **CORS** — Cross-origin request configuration.
* **dotenv** — Environment variable management.

### Email

* **Nodemailer** — Used to send application emails.
* **Brevo** — Used as the email delivery service.

## 🎯 What I Practiced

This project allowed me to practice backend and full-stack development, including:

* Building a REST API with Node.js and Express.
* MVC architecture.
* JWT authentication and role-based authorization.
* Password hashing and credential management.
* MongoDB data modeling with Mongoose.
* Relationships between users, projects, tasks, and notes.
* Middleware-based request processing.
* Request validation.
* CRUD operations.
* Protected resources.
* Account confirmation and password recovery.
* Temporary token management.
* Email integration.
* Error handling.
* Connecting a React frontend to a REST API.

## 🌐 Live Demo

[View the live application](https://task-front-wheat.vercel.app/)

### Demo Account

**Email:** `correo@correo.com`
**Password:** `[demo password]`

> The demo account is provided for testing purposes.

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/JahirML/task-server.git
cd task-server
```

Install dependencies:

```bash
npm install
```

Configure the required environment variables and run the development server:

```bash
npm run dev
```

The API will be available on the configured local port.

## 🔗 Related Repository

[TaskFlow — Frontend](https://github.com/JahirML/task-front)
