# Minly Media Platform

A full-stack media sharing platform that allows users to upload, view, and interact with images and videos across web and mobile platforms.

## 🏗️ Architecture

The project consists of three main components:

```
minly-media/
├── backend/          # Node.js + TypeScript + Express API
├── mobile/           # React Native + Expo mobile app
└── web/              # React + TypeScript web application
```

### Backend (Node.js + TypeScript)
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **File Storage**: AWS S3 for media uploads
- **Security**: Helmet, CORS, rate limiting

### Mobile App (React Native + Expo)
- **Framework**: React Native with Expo SDK 53
- **Navigation**: Expo Router
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Media Handling**: Expo Image Picker, Expo Video
- **Cross-platform**: iOS and Android support

### Web Application (React + TypeScript)
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance
- Expo CLI (for mobile development)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend root:
```env
PORT=3001
MONGO_URI="your-database-secret"
JWT_SECRET_KEY="your-super-secret-jwt-key-here"

```

4. Start the development server:
```bash
npm run dev
```

The backend API will be available at `http://localhost:3001`

### Web Application Setup

1. Navigate to the web directory:
```bash
cd web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The web application will be available at `http://localhost:5173`

### Mobile Application Setup

1. Navigate to the mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the Expo development server:
```bash
npm start
```

4. Use the Expo Go app on your device or run on simulators:
   - For iOS: `npm run ios`
   - For Android: `npm run android`
   - For Web: `npm run web`

## 📱 Features

### Core Functionality
- **Media Upload**: Upload images and videos with preview
- **Media Gallery**: Browse all uploaded media in a responsive grid
- **Like System**: Like and unlike media content with real-time updates
- **User Authentication**: Secure login and registration system
- **Cross-Platform**: Consistent experience across web and mobile

### Technical Features
- **Responsive Design**: Mobile-first design approach
- **Real-time Updates**: Live like counts and media updates
- **File Management**: Efficient media storage with AWS S3
- **Security**: JWT authentication, request rate limiting, input validation
- **Error Handling**: Comprehensive error handling and user feedback

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get user profile (protected)
- `DELETE  /api/auth/user/:id` - Delete user (protected)

### Media Management
- `GET /api/media` - Get all media content (protected)
- `POST /api/media/upload` - Upload new media (protected)
- `PUT /api/media/:id/like` - Like/unlike media (protected)
- `DELETE /api/media/:id` - Delete media (protected)

## 🛠️ Development Scripts

### Backend
```bash
npm run dev      # Start development server with nodemon
npm run build    # Build TypeScript to JavaScript
npm start        # Start production server
npm test         # Run tests
```

### Web Application
```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Mobile Application
```bash
npm start        # Start Expo development server
npm run android  # Run on Android device/simulator
npm run ios      # Run on iOS device/simulator
npm run web      # Run as web application
```

## 📦 Key Dependencies

### Backend
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **multer**: File upload handling
- **bcryptjs**: Password hashing
- **helmet**: Security middleware

### Web Application
- **react**: UI library
- **react-router-dom**: Client-side routing
- **axios**: HTTP client
- **tailwindcss**: Utility-first CSS framework
- **react-icons**: Icon library

### Mobile Application
- **expo**: Development platform
- **react-navigation**: Navigation library
- **expo-image-picker**: Media selection
- **expo-video**: Video playback
- **nativewind**: Tailwind CSS for React Native

## 🔒 Security Features

- JWT-based authentication system
- Password hashing with bcrypt
- Request rate limiting
- CORS configuration
- Input validation and sanitization
- Secure file upload handling
- Protected API endpoints

## 📱 Platform Support

- **Web**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile**: iOS 11+ and Android 5.0+
- **Development**: macOS, Windows, Linux

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🆘 Troubleshooting

### Common Issues

**Backend won't start:**
- Ensure MongoDB is running
- Check if all environment variables are set

**Mobile app not connecting to backend:**
- Check if backend server is running
- For physical devices, use your computer's IP address instead of localhost

**File uploads failing:**
- Check file size limits (default: 100MB)
- Ensure proper CORS configuration

### Getting Help

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all environment variables are correctly set
3. Ensure all dependencies are installed (`npm install`)
4. Check network connectivity between frontend and backend

## 🎯 Future Enhancements

- [ ] Native iOS and Android applications
- [ ] Real-time notifications
- [ ] Video streaming optimization
- [ ] Social features (comments, sharing)
- [ ] Content moderation
- [ ] Progressive Web App (PWA) support
- [ ] CI/CD pipeline with automated deployment
