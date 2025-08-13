# 🎯 UNFILTER.AI

**AI-Powered Career Compass for Class 9–12 Students**

> Discover Your Strengths, Explore Future Paths, and Make Smarter Career Choices Early — Without Any Filters!

## 🌟 **About UNFILTER.AI**

UNFILTER.AI is a revolutionary career guidance platform designed specifically for **Class 9-12 students** in India. We provide honest, AI-powered insights to help young minds make informed decisions about their academic and career future.

### 🎯 **Target Audience:**
- **Class 9 Students** - Early career exploration and academic planning
- **Class 10 Students** - Stream selection (Science/Commerce/Arts)  
- **Class 11-12 Students** - College entrance exam strategy and career planning
- **Parents & Educators** - Supporting informed decision-making

---

## 🚀 **Key Features**

### 🤖 **AI-Powered Career Assistant**
- Hinglish chat support (Hindi + English)
- Personalized career guidance based on student profile
- 24/7 availability for student queries
- Realistic career predictions without false promises

### 📊 **Comprehensive Assessment**
- Multi-subject psychometric testing
- Academic strength and weakness analysis
- Performance tracking and progress monitoring
- Detailed analytics and insights

### 🎯 **Reality-Based Guidance**
- Honest success predictions for various career paths
- Multiple backup options and alternative careers
- Early decision-making support from Class 9
- No sugar-coating - just honest guidance

---

## 🛠️ **Project Structure**

```
UNFILTER.AI/
├── client/          # Next.js frontend application
│   ├── src/
│   │   ├── app/     # App router pages
│   │   ├── components/  # Reusable UI components
│   │   ├── sections/    # Page sections
│   │   └── context/     # React context providers
│   └── public/      # Static assets
├── server/          # Node.js backend API
│   ├── Controllers/ # Business logic
│   ├── routes/      # API endpoints
│   ├── Schemas/     # Database models
│   └── middleware/  # Custom middleware
└── README.md        # This file
```

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18.0 or higher
- npm or yarn
- MongoDB (for backend)

### **Installation**

1. **Clone the repository**
```bash
git clone <repository-url>
cd UNFILTER.AI
```

2. **Setup Frontend**
```bash
cd client
npm install
```

3. **Setup Backend**
```bash
cd ../server
npm install
```

4. **Environment Configuration**
```bash
# In client/.env.local
MISTRAL_API_KEY=your_mistral_api_key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

5. **Run the Application**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
cd client
npm run dev
```

6. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## 💻 **Tech Stack**

### **Frontend (Client)**
- **Next.js 15.1.6** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Mistral AI** - Chat responses

### **Backend (Server)**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication

---

## 🎯 **Core Pages & Features**

### 📱 **Frontend Pages**
- `/` - Homepage with platform overview
- `/ai-chat` - AI-powered career assistant
- `/psychometric-test` - Student assessment tool
- `/dashboard` - Student progress tracking
- `/advisor` - Career guidance interface
- `/prediction` - Career success predictions

### 🔧 **API Endpoints**
- `/api/chat` - AI chat responses
- `/api/auth` - User authentication
- `/api/test-results` - Assessment data
- `/user` - User profile management

---

## 🌟 **Why UNFILTER.AI?**

### **The Problem**
- Most career guidance platforms give false hopes to students
- Lack of honest assessment about realistic career prospects
- No early intervention for Class 9-10 students
- Generic advice not tailored to Indian education system

### **Our Solution**
- **Honest AI-powered insights** without sugar-coating
- **Early career guidance** starting from Class 9
- **Realistic predictions** based on current performance
- **Multiple backup options** for every career path
- **Hinglish support** for better communication

---

## 🤝 **Contributing**

We welcome contributions from developers, educators, and career counselors!

### **How to Contribute**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### **Areas for Contribution**
- UI/UX improvements
- Additional AI model integrations
- Career database expansion
- Mobile app development
- Regional language support

---

## 📄 **License**

This project is licensed under the MIT License.

---

## 🙏 **Acknowledgments**

- **Students & Parents** who inspired this platform
- **Career Counselors** who provided domain expertise
- **AI/ML Community** for open-source tools
- **Education Sector** for continuous feedback

---

**Built with ❤️ for the future generation of India**

*Empowering Class 9-12 students to make informed career decisions through honest, AI-driven guidance.*
