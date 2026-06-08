import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/errorMiddleware.js';

import contactRoutes from './routes/contactRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import caseStudyRoutes from './routes/caseStudyRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/growthedge';

app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());

app.get('/api/health', (_req, res) =>
  res.json({ success: true, message: 'Server is running' })
);

app.use('/api/contact', contactRoutes);
app.use('/api/subscribe', subscriberRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/testimonials', testimonialRoutes);

app.use(errorHandler);

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('[DB] Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`[SERVER] Running on port ${PORT}`);
    });
  } catch (err) {
    console.error('[STARTUP] Failed to start server:', err);
    process.exit(1);
  }
}

start();
