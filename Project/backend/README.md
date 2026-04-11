🚀 BACKEND LEARNING PROJECT
(Node.js + Express + MongoDB)
========================================

📌 FEATURES
- User Registration API
- User Login (JWT Authentication)
- User Logout
- Protected Routes (Middleware)
- JWT Token Verification
- Password Hashing (Bcrypt)
- Image Upload using Cloudinary
- Secure API Handling

----------------------------------------
🛠️ TECH STACK
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Bcrypt.js
- Cloudinary
- Multer
- Postman

----------------------------------------
⚙️ SETUP GUIDE

1️⃣ Clone Repository
git clone (https://github.com/Engr-Hamza-Khan-dev/Backend-Journey/tree/master/Project/backend)

2️⃣ Install Dependencies
npm install

3️⃣ Create .env file
PORT=8000
MONGO_URI=your_mongodb_connection
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

4️⃣ Run Server
npm run dev

----------------------------------------
📬 API ROUTES

POST   /api/user/register   -> Register User
POST   /api/user/login      -> Login User
POST   /api/user/logout     -> Logout User

----------------------------------------
📸 IMAGE HANDLING
- Images are uploaded to Cloudinary
- Not stored in MongoDB

----------------------------------------
⚠️ ISSUES I FACED
- req.body undefined (missing express.json)
- JWT 401 Unauthorized errors
- Access vs Refresh token confusion
- FormData vs JSON issue
- Middleware errors (cookie-parser missing)
- Authorization header mistakes

----------------------------------------
💡 WHAT I LEARNED
- JWT Authentication flow
- Middleware concept
- Real-world backend structure
- File upload handling
- API testing with Postman
- Debugging backend errors

----------------------------------------
🚀 PURPOSE
This is a learning-based backend project
built to understand real-world backend concepts.

----------------------------------------
👤 AUTHOR
Muhammad Hamza Khan
MERN Stack Learner

========================================
⭐ END OF FILE