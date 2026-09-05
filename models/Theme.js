import mongoose from 'mongoose';

const ThemeSchema = new mongoose.Schema({
  technologyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Technology', required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  order: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  randomQuestionCount: { type: Number } // User requested feature
}, { timestamps: true });

export default mongoose.models.Theme || mongoose.model('Theme', ThemeSchema);
