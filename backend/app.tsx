import express, { Application } from 'express';
import mongoose from 'mongoose';
import { authenticate, errorHandler } from './middleware';
import cors from 'cors'; // Import cors middleware

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/recipe')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

  app.use(cors()); // Enable CORS for all routes
// Middleware
app.use(express.json()); // Add this line to parse JSON bodies
if (process.env.NODE_ENV === 'production') {
  app.use(authenticate); // Apply authentication middleware to all routes
} 

// Routes
app.use('/', require('./routes/authRoutes').default);
app.use('/', require('./routes/uploadRoutes').default);
app.use('/', require('./routes/recipeRoutes').default);
app.use('/', require('./routes/userRoutes').default);

app.use('/api/videos', require('./routes/videoRoutes').default);

app.get('/', (req, res) => {
  res.send('Welcome to the YouTube Upload API!');
});
// Global error handling middleware
app.use(errorHandler);

app.listen(PORT || 5000    , () => {
  console.log(`Server is running on port ${PORT}`);
});