# Hackoo Chat App

Hackoo Chat App is a real-time chat application built with modern web technologies. It allows users to sign up, log in, chat in real-time, send images, and filter online users. The app uses JWT authentication for security and stores images on Cloudinary. The backend is powered by Node.js, Express, and MongoDB, while the frontend is developed with React, Tailwind CSS, Zustand, and React Router. The entire system operates over WebSockets using Socket.io.

## Features

- **User Authentication**: Sign up and log in using JWT authentication.
- **Real-time Chat**: Instant messaging with WebSocket (Socket.io).
- **Online User Filtering**: View and filter online users in real-time.
- **Image Sharing**: Upload and send images stored on Cloudinary.
- **MongoDB Atlas**: Secure cloud database for user and chat storage.

## Tech Stack

### Backend:
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- Cloudinary (for image storage)
- Socket.io (for real-time communication)

### Frontend:
- React.js
- Tailwind CSS
- Zustand (for state management)
- React Router (for navigation)

## Installation & Setup

### Prerequisites
Make sure you have Node.js and npm installed on your system.

### Clone the Repository
```sh
git clone https://github.com/yourusername/hackoo-chat-app.git
cd hackoo-chat-app
```

### Install Dependencies
```sh
npm install --prefix backend
npm install --prefix frontend
```

### Run the Application
#### Build Frontend
```sh
npm run build --prefix frontend
```
#### Start Backend
```sh
npm run start --prefix backend
```

## Environment Variables
Create a `.env` file in the backend directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Folder Structure
```
/hackoo-chat-app
├── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   ├── config
│   ├── server.js
│   ├── .env
│   └── package.json
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── store (Zustand state management)
│   ├── App.js
│   ├── index.js
│   └── package.json
└── README.md
```

## Usage
1. Register a new account or log in.
2. View online users and start a conversation.
3. Send messages in real-time.
4. Upload and share images with other users.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the ISC License.

