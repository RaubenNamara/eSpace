# eSpace - Enterprise eLearning Management System

A production-ready, enterprise-level Secondary School eLearning Management System built with modern technologies.

## Technology Stack

### Frontend
- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- TailwindCSS
- Axios
- TipTap Editor
- PDF.js
- Konva.js
- Progressive Web App (PWA)

### Backend
- PHP 8+
- Custom MVC Architecture
- REST API
- Composer
- PDO
- MySQL 8.4
- Redis

### Authentication
- Secure PHP Sessions
- Role Based Access Control
- CSRF Protection
- Password Hashing using Argon2id
- Login Rate Limiting
- Audit Logs

## System Users
- Student
- Teacher
- Head of Department (HOD)
- Administrator

## Project Structure

```
eSpace/
├── backend/              # PHP Backend
│   ├── app/
│   │   ├── Controllers/
│   │   ├── Models/
│   │   ├── Middleware/
│   │   ├── Services/
│   │   └── Repositories/
│   ├── config/
│   ├── database/
│   │   └── migrations/
│   ├── public/
│   │   └── api/
│   ├── routes/
│   ├── storage/
│   └── uploads/
├── frontend/             # Vue 3 Frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── services/
│   │   ├── stores/
│   │   └── types/
│   └── public/
└── database/
    └── schema.sql
```

## Installation

### Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php migrate.php
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Security Features
- Argon2id password hashing
- CSRF protection
- SQL injection prevention
- XSS protection
- Rate limiting
- Audit logging
- Role-based access control

## License
Proprietary - Commercial Use Only
