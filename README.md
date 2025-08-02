# Code of Resilience

An immersive, story-driven, 3D animated manga-style storytelling website with a **React + Vite frontend** and **Node.js/Express backend** for **Contact Us form handling**.  
It delivers a **cinematic, professional UI/UX** inspired by top creative studios and showcases **interactive storytelling, 3D mascots, and microinteractions**.



## 🌟 Key Features

- **🎨 Premium Frontend UI/UX** – Cinematic, emotionally engaging design with Tailwind CSS.
- **📱 Fully Responsive** – Optimized for mobile, tablet, and desktop.
- **🎭 3D Mascots** – Interactive Three.js mascots that travel along a timeline of chapters.
- **🎬 Smooth Transitions** – Framer Motion & GSAP for microinteractions and page animations.
- **📜 Immersive Storytelling** – Scroll-driven manga-style panels with mascot-guided chapters.
- **🍞 Toast Notifications** – Modern, user-friendly feedback for interactions.
- **📨 Contact Us with Backend** – Node.js/Express API handles user submissions:
  - **Your Name** – `Enter your name`
  - **Email Address** – `Enter your email`
  - **Message** – `Write your message here...`
- **⚡ Optimized & Modular** – Lazy loading, structured components, and errorless operation.



## 📁 Project Structure



code-of-resilience/
│
├── backend/                   # Node.js/Express backend
│   ├── server.js               # Entry point
│   ├── routes/
│   │   └── contactRoutes.js     # Contact form endpoint
│   ├── controllers/
│   │   └── contactController.js # Handles form submissions
│   ├── models/
│   │   └── contactModel.js      # Optional: if storing in DB
│   ├── package.json
│   └── .env                     # Environment variables (PORT, DB\_URI, etc.)
│
├── frontend/                   # React + Vite frontend
│   ├── public/
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ContactUs.jsx
│   │   │   ├── CustomCursor.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── ImageGrid.jsx
│   │   │   ├── ImageHover.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Marquee.jsx
│   │   │   ├── MysteryElement.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PageTransition.jsx
│   │   │   ├── RippleEffect.jsx
│   │   │   ├── ScrollTextAnimation.jsx
│   │   │   ├── StoryReader.jsx
│   │   │   ├── StoryTimeline.jsx
│   │   │   └── TeamSection.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── README.md
└── .gitignore




## ⚡ Backend Overview

- **Node.js + Express** handles the Contact Us form submissions.  
- Example endpoint:  

```js
POST /api/contact
Body: {
  name: "User Name",
  email: "user@example.com",
  message: "Hello! This is my message."
}


* Stores submissions in DB (optional) or logs them.
* Sends response back to frontend for toast notification.



## 🛠️ Installation & Execution

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/code-of-resilience.git
cd code-of-resilience


### 2️⃣ Setup and Run Backend

```bash
cd backend
npm install


**Create `.env` file**:


PORT=5000
# DB_URI=mongodb+srv://your-db 


**Run backend**:

```bash
npm start


Backend runs on: **[http://localhost:5000](http://localhost:5000)**



### 3️⃣ Setup and Run Frontend

```bash
cd ../frontend
npm install
npm install framer-motion three @react-three/fiber @react-three/drei react-hot-toast gsap
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


**Run frontend**:

```bash
npm run dev


Frontend runs on: **[http://localhost:5173](http://localhost:5173)**



### 4️⃣ Connecting Frontend & Backend

* The **ContactUs.jsx** component sends form data to:


  POST http://localhost:5000/api/contact
 
* On success, the user gets a **toast notification** confirming submission.



## 🎨 Interactive Experience

* **Loader with animated particles**
* **3D mascot guiding story timeline**
* **Manga-style panel transitions**
* **Interactive hover effects, marquee, ripple effects**
* **Toast confirmations for Contact Us submissions**




> **Tip:** For the best experience, run **both backend and frontend** together, open in fullscreen, and scroll slowly to enjoy all **animations, microinteractions, and 3D mascot effects**.



---
