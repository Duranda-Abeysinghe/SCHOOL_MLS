# 🎓 Cloud-Based School Management System

<div align="center">

![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react)
![ASP.NET](https://img.shields.io/badge/Backend-ASP.NET_Core-512BD4?style=for-the-badge&logo=dotnet)
![MySQL](https://img.shields.io/badge/Database-MySQL-00758F?style=for-the-badge&logo=mysql)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/Project-Active-success?style=for-the-badge)

A modern full-stack web application designed to automate and digitize school management operations.

</div>

---

# 📖 Project Overview

The **Cloud-Based School Management System** is developed to manage academic and administrative operations efficiently through a centralized online platform.

The system supports:

✅ Student Management  
✅ Teacher Management  
✅ Attendance Tracking  
✅ Marks & Grade Management  
✅ JWT Authentication  
✅ Role-Based Access Control  
✅ Academic Request Handling  
✅ Dashboard Analytics  
✅ Cloud Deployment  

---

# 🚀 Features

# 👨‍💼 Admin Module

- Manage Students
- Manage Teachers
- Manage Subjects & Classes
- Publish Announcements
- Generate Reports
- Dashboard Analytics

---

# 👨‍🏫 Teacher Module

- Mark Attendance
- Enter Student Marks
- View Schedules
- Manage Student Requests

---

# 👨‍🎓 Student Module

- View Attendance
- View Marks & Performance
- Access Weekly Schedules
- Submit Academic Requests

---

# 🔐 Security Features

- JWT Authentication
- Role-Based Authorization
- Protected REST APIs
- Password Encryption (BCrypt)
- Secure HTTPS Communication

---

# 🛠️ Technology Stack

| Category | Technology |
|---|---|
| 🎨 Frontend | React.js + Vite |
| ⚙️ Backend | ASP.NET Core Web API |
| 🗄️ Database | MySQL |
| 🔑 Authentication | JWT |
| ☁️ Deployment | Vercel / VPS / AWS RDS |

---

# 🏗️ System Architecture

```text
React Frontend
       ↓
ASP.NET Core Web API
       ↓
MySQL Database
```

---

# 📂 Project Structure

```bash
school-management-system
│
├── frontend
│   ├── src
│   ├── public
│   ├── components
│   ├── pages
│   └── services
│
├── backend
│   ├── Controllers
│   ├── Models
│   ├── Services
│   ├── Repositories
│   ├── DTOs
│   └── Authentication
│
└── database
```

---

# ⚡ Frontend Setup

## Install Dependencies

```bash
cd frontend
npm install
```

## Run Frontend

```bash
npm run dev
```

Frontend URL:

```bash
http://localhost:5173
```

---

# ⚡ Backend Setup

## Restore Packages

```bash
cd backend
dotnet restore
```

## Run Backend

```bash
dotnet run
```

Backend URL:

```bash
https://localhost:5001
```

---

# 🗄️ Database Setup

## Create Database

```sql
CREATE DATABASE school_management;
```

---

## Configure Connection String

Inside:

```bash
appsettings.json
```

Add:

```json
"ConnectionStrings": {
  "DefaultConnection":
  "server=localhost;database=school_management;user=root;password=yourpassword"
}
```

---

# 🔄 Run Database Migration

```bash
Add-Migration InitialCreate
Update-Database
```

---

# 🔑 Authentication Flow

```text
Login
   ↓
Validate User
   ↓
Generate JWT Token
   ↓
Store Token
   ↓
Access Protected APIs
```

---

# 📊 Current Progress

| Module | Status |
|---|---|
| Frontend Setup | ✅ Completed |
| Backend Setup | ✅ Completed |
| Database Setup | ✅ Completed |
| Authentication | 🔄 In Progress |
| Student Module | 🔄 In Progress |
| Attendance Module | ⏳ Pending |
| Deployment | ⏳ Pending |

---

# 🧪 Testing Tools

- Swagger
- Postman
- Browser Developer Tools

---

# ☁️ Deployment Plan

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | VPS / Render |
| Database | AWS RDS |

---

# 🔮 Future Enhancements

- 📱 Mobile Application
- 👨‍👩‍👧 Parent Portal
- 🤖 AI Performance Analysis
- 📩 SMS Notifications
- 📝 Online Examination System
- 💬 Real-Time Chat

---

# 🎯 Expected Benefits

✅ Reduced paperwork  
✅ Faster academic operations  
✅ Improved communication  
✅ Better accessibility  
✅ Secure academic records  
✅ Cloud-based management  

---

# 👨‍💻 Author

## Duranda Abeysinghe

Internship Project — School Management System

---

# ⭐ Project Status

🚧 Currently Under Development

---

# 📜 License

This project is developed for educational and internship purposes.
