import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ['Strategy', 'Digital', 'Leadership', 'Finance', 'Operations', 'Growth'],
      required: true,
    },
    author: { type: String, required: true },
    authorRole: { type: String },
    authorImage: { type: String },
    coverImage: { type: String },
    tags: [{ type: String }],
    readTime: { type: Number, default: 5 },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('BlogPost', blogPostSchema);
