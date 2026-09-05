import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  themeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme', required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, // Index of the correct option
  explanation: { type: String },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' }, // User requested feature
  order: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);
