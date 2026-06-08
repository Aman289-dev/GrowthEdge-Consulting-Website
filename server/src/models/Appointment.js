import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    service: {
      type: String,
      enum: [
        'Business Strategy',
        'Digital Transformation',
        'Market Research',
        'Financial Planning',
        'Operational Excellence',
        'Leadership Development',
        'Other',
      ],
      default: 'Other',
    },
    preferredDate: { type: String },
    preferredTime: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Appointment', appointmentSchema);
