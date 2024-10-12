
```markdown
# Task Manager

A simple yet effective task management application built with Next.js, Prisma, and PostgreSQL. This application allows users to create, manage, and delete tasks with user authentication and JWT-based session management.

## Features

- User authentication (Register and Login)
- Create, Read, Update, and Delete (CRUD) tasks
- Mark tasks as completed
- Responsive design
- JWT authentication using cookies
- Multi-user support

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)

## Installation

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- npm or yarn

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ajoshi3010/task-manager.git
   cd task-manager
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up the database**:

   - Create a new PostgreSQL database.
   - Update the `DATABASE_URL` in your `.env.local` file.

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/yourdatabase
   JWT_SECRET=your_jwt_secret
   ```

4. **Run Prisma migrations**:

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser and navigate to** `http://localhost:3000`

## Usage

- **Register**: Create a new user account.
- **Login**: Authenticate using your email and password.
- **Manage Tasks**: Add, edit, delete, and mark tasks as completed.

## API Endpoints

### Authentication

- **POST** `/api/auth/login` 
  - Request Body: `{ "email": "user@example.com", "password": "yourpassword" }`
  - Response: Returns a JWT token set as a cookie.

- **POST** `/api/auth/register`
  - Request Body: `{ "email": "user@example.com", "password": "yourpassword" }`
  - Response: Confirmation message of successful registration.

- **POST** `/api/auth/logout`
  - Response: Clears the JWT cookie and logs out the user.

- **GET** `/api/auth/check`
  - Response: Returns the logged-in user's email if authenticated.

### Tasks

- **GET** `/api/tasks`
  - Response: Returns a list of tasks for the authenticated user.

- **GET** `/api/tasks/:id`
  - Response: Returns the details of a specific task.

- **POST** `/api/tasks`
  - Request Body: `{ "title": "Task Title", "description": "Task Description" }`
  - Response: Returns the newly created task.

- **PUT** `/api/tasks/:id`
  - Request Body: `{ "title": "Updated Title", "description": "Updated Description", "completed": true }`
  - Response: Returns the updated task.

- **DELETE** `/api/tasks/:id`
  - Response: Confirmation message of successful deletion.

## License

This project is licensed under the MIT License.

---

Feel free to modify any sections according to your project specifics. This template gives a comprehensive overview of your Task Manager application and guides users through setup and usage. If you have any additional information to include or specific formatting preferences, let me know!