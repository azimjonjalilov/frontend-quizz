import mongoose from 'mongoose';

const QuizAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  technologyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Technology', required: true },
  themeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme', required: true },
  answers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    selectedAnswer: { type: Number },
    isCorrect: { type: Boolean }
  }],
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  wrongAnswers: { type: Number, required: true },
  score: { type: Number, required: true }, // number like 80
  percentage: { type: String }, // string like "80%"
  startedAt: { type: Date },
  completedAt: { type: Date }
}, { timestamps: true });

export default mongoose.models.QuizAttempt || mongoose.model('QuizAttempt', QuizAttemptSchema);
