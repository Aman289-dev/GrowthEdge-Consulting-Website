import mongoose from 'mongoose';

const caseStudySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    client: { type: String, required: true },
    industry: { type: String, required: true },
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
    results: [{ type: String }],
    metrics: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    tags: [{ type: String }],
    coverImage: { type: String },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('CaseStudy', caseStudySchema);
