

# 🧠 **Athena-AI – MERN Chatbot Application**

A full-stack AI chatbot built using the **MERN Stack**, powered by **Google Gemini API** for text & image generation, **ImageKit** for image hosting, **JWT authentication**, **Stripe payments & webhooks**, and fully tested using **Postman**.

---

## 🚀 **Features**

### ✅ **AI Chat System**

* Real-time chatbot powered by **Gemini 2.0 Flash**
* Supports **text messages**
* Supports **AI image generation**
* Chat history stored in MongoDB
* Create / Delete chats

### 🖼️ **Image Generation**

* AI generates images using **OpenAI / Gemini image API**
* Images are uploaded to **ImageKit**
* Optimized & compressed delivery
* Ability to publish images to community feed

### 💳 **Credits System**

* Users consume credits for:

  * Text generation
  * Image generation
* Buy credits using **Stripe Checkout**
* Stripe **webhooks** automatically update credits after successful payment

### 🔐 **Authentication**

* JWT + bcrypt user login & registration
* Protected routes
* Token stored in LocalStorage

### 🌗 **Dark / Light Theme**

* Fully responsive design
* Theme stored in localStorage
* Tailwind CSS Dark/Light mode

### 🛠️ **Postman API Testing**

* All endpoints tested using Postman
* Includes authentication, chat, image, and payment routes

---

## 🏗️ **Tech Stack**

### **Frontend**

* React.js (Vite)
* Context API
* Axios
* React Router DOM
* Tailwind CSS
* Moment.js
* React Hot Toast

### **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Stripe (Payments + Webhooks)
* ImageKit SDK
* Gemini API (Text + Image Generation)
* dotenv

---

## 📁 **Folder Structure**

```
├── backend
│   ├── configs
│   │   ├── db.js
│   │   ├── imageKit.js
│   │   ├── openai.js
│   ├── controllers
│   │   ├── userController.js
│   │   ├── chatController.js
│   │   ├── messageController.js
│   │   ├── creditController.js
│   ├── middlewares
│   │   ├── auth.js
│   ├── models
│   │   ├── User.js
│   │   ├── Chat.js
│   │   ├── Transaction.js
│   ├── routes
│   │   ├── userRoutes.js
│   │   ├── chatRoutes.js
│   │   ├── messageRoutes.js
│   │   ├── creditRoutes.js
│   ├── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   ├── assets
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── public
│   ├── index.html
│
└── README.md
```

---

## ⚙️ **Installation and Setup**

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/chatbot-mern.git
cd chatbot-mern
```

---

## 🌐 Backend Setup

### 2️⃣ Install backend dependencies

```bash
cd backend
npm install
```

### 3️⃣ Create `.env` file

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
IMAGEKIT_PUBLIC_KEY=your_public
IMAGEKIT_PRIVATE_KEY=your_private
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

STRIPE_SECRET_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

GEMINI_API_KEY=your_gemini_key
```

### 4️⃣ Start backend

```bash
npm start
```

---

## 💻 Frontend Setup

### 5️⃣ Install frontend dependencies

```bash
cd frontend
npm install
```

### 6️⃣ Add your environment variable

Create `.env`:

```
VITE_SERVER_URL=http://localhost:3000
```

### 7️⃣ Start frontend

```bash
npm run dev
```

---

## 🔥 **API Endpoints**

### 🔐 Authentication

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/user/register` | Register user |
| POST   | `/api/user/login`    | Login user    |
| GET    | `/api/user/data`     | Get user info |

---

### 💬 Chat Endpoints

| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| POST   | `/api/chat/create` | Create new chat |
| GET    | `/api/chat/get`    | Get all chats   |
| DELETE | `/api/chat/delete` | Delete chat     |

---

### 🧠 AI Message Endpoints

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/message/text`  | AI text generation  |
| POST   | `/api/message/image` | AI image generation |

---

### 💳 Credits / Payments

| Method | Endpoint               | Description                      |
| ------ | ---------------------- | -------------------------------- |
| GET    | `/api/credit/plan`     | Get available plans              |
| POST   | `/api/credit/purchase` | Purchase credits via Stripe      |
| POST   | `/webhook`             | Stripe webhook to update credits |

---

## 🧪 Using Postman for Testing

* Import routes
* Add Authorization header

* Test:
  ✔ Register
  ✔ Login
  ✔ Create/Delete chats
  ✔ Text Generation
  ✔ Image Generation
  ✔ Stripe purchase flow

---


## 🤝 Contributing

Pull requests are welcome!

---

## 📜 License

MIT License © 2025

