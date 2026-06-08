import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
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
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Contact', contactSchema);
