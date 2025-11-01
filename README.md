# 🎨 Artist Gallery Platform

A modern, full-stack web application for artists to showcase their work and for art enthusiasts to discover amazing artworks. Built with Angular and Node.js/Express.

## 🚀 ONE COMMAND START

```bash
npm run dev
```
or
```bash
./start.sh
```
or
```bash
npm start
```

**That's it!** Both frontend and backend start automatically. Open http://localhost:4200 after ~30-60 seconds.

## ✨ Features

- **Browse Artists**: Discover talented artists from around the world with beautiful profile pages
- **Artwork Gallery**: View stunning artwork collections with high-quality images
- **Upload System**: Easy-to-use interface for uploading and sharing artwork
- **Search & Filter**: Find artists by name, specialty, or location
- **Like System**: Show appreciation for artworks you love
- **Responsive Design**: Modern, mobile-friendly UI with smooth animations
- **RESTful API**: Robust backend with file upload support

## 🛠️ Tech Stack

### Frontend
- **Angular 16** - Modern web framework
- **TypeScript** - Type-safe development
- **CSS3** - Custom styling with animations
- **RxJS** - Reactive programming

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd webtech
```

2. **Install all dependencies**
```bash
npm run install:all
```

This will install dependencies for:
- Root project
- Frontend (Angular)
- Backend (Express API)

### Running the Application

#### 🚀 ONE COMMAND START (Recommended)
```bash
./start.sh
```
**OR**
```bash
npm start
```

**That's it!** This single command will:
- ✅ Start the backend server on http://localhost:3000
- ✅ Start the frontend server on http://localhost:4200
- ✅ Run both in the background
- ✅ Open automatically in ~30-60 seconds

**To stop:** Press `Ctrl+C` - both servers stop automatically!

---

#### Option 2: Run Separately (Two Terminals)

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npx ng serve --port 4200
```

### First Time Setup

If you're running the application for the first time and encounter module issues:

1. **Install frontend dependencies:**
```bash
cd frontend
npm install
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
```

3. **Start backend server:**
```bash
cd backend
npm run dev
```

4. **Start frontend (new terminal):**
```bash
cd frontend
npm start
```

## 📁 Project Structure

```
webtech/
├── frontend/                 # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # UI components
│   │   │   ├── services/    # API services
│   │   │   ├── models/      # Data models
│   │   │   └── ...
│   │   ├── styles.css       # Global styles
│   │   └── index.html
│   ├── angular.json
│   └── package.json
│
├── backend/                  # Express API
│   ├── server.js            # Main server file
│   ├── uploads/             # Uploaded images (created at runtime)
│   └── package.json
│
└── README.md
```

## 🎯 API Endpoints

### Artists
- `GET /api/artists` - Get all artists
- `GET /api/artists/:id` - Get single artist with artworks
- `POST /api/artists` - Create new artist

### Artworks
- `GET /api/artworks` - Get all artworks
- `GET /api/artworks?artistId=:id` - Get artworks by artist
- `GET /api/artworks/:id` - Get single artwork
- `POST /api/artworks` - Upload new artwork (multipart/form-data)
- `POST /api/artworks/:id/like` - Like an artwork
- `DELETE /api/artworks/:id` - Delete artwork

## 🎨 Features in Detail

### Home Page
- Hero section with call-to-action
- Featured artworks showcase
- Community statistics
- Smooth animations and transitions

### Artists Page
- Grid layout of all artists
- Real-time search functionality
- Artist cards with key information
- Follower and artwork counts

### Artist Detail Page
- Large profile header with avatar
- Complete artist bio and stats
- Portfolio grid of all artworks
- Like functionality on each artwork

### Upload Page
- Artist selection dropdown
- Image upload with preview
- Title, description, and tags
- Helpful upload tips sidebar
- Success feedback and redirection

## 🎨 Design Features

- **Dark Theme**: Modern dark UI with custom color palette
- **Gradient Accents**: Eye-catching gradient effects
- **Smooth Animations**: Fade-in, slide-in, and hover effects
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Custom Components**: Reusable artwork cards and navigation
- **Loading States**: Visual feedback during data fetching

## 🔧 Configuration

### Frontend Configuration
Edit `frontend/src/app/services/api.service.ts` to change the API URL:
```typescript
private apiUrl = 'http://localhost:3000/api';
```

### Backend Configuration
Edit `backend/server.js` to change the port:
```javascript
const PORT = 3000;
```

## 📝 Sample Data

The application comes with pre-populated sample data including:
- 5 artists with diverse specialties
- 6+ sample artworks
- Various art styles and tags

## 🚀 Deployment

### Frontend (Angular)
```bash
cd frontend
npm run build
# Deploy the dist/ folder to your hosting service
```

### Backend (Node.js)
```bash
cd backend
npm start
# Deploy to your Node.js hosting service (Heroku, AWS, etc.)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🎉 Acknowledgments

- Sample avatars from Pravatar
- Sample images from Picsum Photos
- Icons and emojis for visual appeal
- Angular and Node.js communities

---

**Happy Creating! 🎨✨**