# 🚀 Family Finance Backend API

A modern Node.js/Express backend for the Family Finance Management App.

## 🌟 Features

- **JWT Authentication** - Secure token-based authentication
- **MongoDB Integration** - Cloud database with Mongoose ODM
- **RESTful API** - Complete CRUD operations for all resources
- **Security** - Rate limiting, CORS, input validation
- **Production Ready** - Deployed on Render with environment variables

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile

### Expenses
- `GET /api/expenses` - Get user expenses
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Savings
- `GET /api/savings` - Get user savings
- `POST /api/savings` - Create saving
- `PUT /api/savings/:id` - Update saving
- `DELETE /api/savings/:id` - Delete saving

### Goals
- `GET /api/goals` - Get user goals
- `POST /api/goals` - Create goal
- `PUT /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal

### Tasks
- `GET /api/tasks` - Get user tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Categories
- `GET /api/categories` - Get expense categories

## 🚀 Deployment

This backend is configured for deployment on Render.com with MongoDB Atlas.

### Environment Variables Required:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Frontend URL for CORS
- `NODE_ENV` - Environment (production)

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Tokens** - Secure authentication
- **Rate Limiting** - 100 requests per 15 minutes
- **Input Validation** - Mongoose schema validation
- **CORS Protection** - Configured origins only
- **Security Headers** - Helmet middleware

## 📊 Database Models

### User
- Profile information (name, email, theme, language, currency)
- Secure password storage
- Profile customization options

### Expense
- Amount, category, description, date
- User association
- Category-based organization

### Savings
- Amount, description, date
- User association
- Progress tracking

### Goal
- Financial goals with target amounts
- Progress tracking
- Multi-user assignment
- Due date management

### Task
- Task management system
- Assignment to family members
- Completion tracking
- Due date management

## 🎯 API Response Format

### Success Response
```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "message": "Error description",
  "error": "Detailed error message"
}
```

## 🔧 Development

### Local Setup
```bash
npm install
npm run dev
```

### Environment Variables (.env)
```
MONGODB_URI=mongodb://localhost:27017/family_finance
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## 📈 Performance

- **Response Time** - < 200ms average
- **Rate Limiting** - Prevents API abuse
- **Database Indexing** - Optimized queries
- **Error Handling** - Comprehensive error management

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ for families managing their finances together.**