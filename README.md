# EverGift

**EverGift** is a modern and elegant web application for managing and sharing gift ideas.  
It allows users to create wishlists, connect events with gifts, and even get AI-powered suggestions from the backend.

🔗 **Live Demo:** https://evergift-frontend.onrender.com 

---

## 🚀 Features

- **Gift Management:** Create, edit, and organize personalized gift lists  
- **Event Calendar:** View and connect gifts with upcoming events  
- **AI Integration:** Interacts with the backend AI to suggest gift ideas  
- **Markdown Support:** Create notes with markdown and syntax highlighting (React Markdown + PrismJS)  
- **Smooth Animations:** Page and element transitions with Framer Motion  
- **Date & Time Utilities:** Simplified date formatting using date-fns  
- **Notifications:** Toast messages for user actions and feedback  
- **Fully Responsive:** Built with TailwindCSS and DaisyUI for a modern, adaptive design  

---

## 🧰 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | React 19 + React Router 7 |
| **Build Tool** | Vite |
| **Styling** | TailwindCSS 4 + DaisyUI |
| **Animations** | Framer Motion |
| **Markdown Rendering** | React Markdown + Remark GFM + PrismJS |
| **Notifications** | React Toastify |
| **Date Handling** | date-fns |
| **Icons** | Lucide React |
| **Calendar UI** | React Calendar |
| **Linting & Dev Tools** | ESLint, React Hooks Plugin, Globals |

---

## 📦 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/SergiiBzn/EverGift-frontend.git
cd EverGift-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a .env file in the project root:
```bash
VITE_API_URL=https://evergift-backend.onrender.com
```

4. **Run the development server**
```bash
npm run dev
````

Open your browser at http://localhost:5173

5. **Build for production**
```bash
npm run build
```