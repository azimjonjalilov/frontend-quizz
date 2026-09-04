import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';

// Define schemas inline to avoid import issues
const TechnologySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  icon: { type: String },
  color: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const ThemeSchema = new mongoose.Schema({
  technologyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Technology', required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const QuestionSchema = new mongoose.Schema({
  themeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme', required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Technology = mongoose.models.Technology || mongoose.model('Technology', TechnologySchema);
const Theme = mongoose.models.Theme || mongoose.model('Theme', ThemeSchema);
const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);

async function seed() {
  try {
    const MONGODB_URI = "mongodb+srv://azimjonjalilovking1301_db_user:JhNcCeVZtVDZam3u@it-quiz-cluster.sdf3p7h.mongodb.net/it_quiz";
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    await Technology.deleteMany({});
    await Theme.deleteMany({});
    await Question.deleteMany({});
    console.log("Cleared existing data.");

    const filePath = path.join(process.cwd(), "data", "db.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(fileData);
    const quizzes = json.quizzes || [];

    for (const [index, quiz] of quizzes.entries()) {
      const technology = await Technology.create({
        name: quiz.title,
        slug: quiz.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        icon: quiz.icon,
        color: quiz.color,
        order: index
      });

      const theme = await Theme.create({
        technologyId: technology._id,
        title: `${quiz.title} Basics`,
        slug: `${quiz.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-basics`,
        order: 0
      });

      const questionsToInsert = quiz.questions.map((q, qIndex) => {
        const correctIndex = q.options.findIndex(opt => opt === q.answer);
        return {
          themeId: theme._id,
          question: q.question,
          options: q.options,
          correctAnswer: correctIndex !== -1 ? correctIndex : 0,
          difficulty: 'medium',
          order: qIndex
        };
      });

      await Question.insertMany(questionsToInsert);
      console.log(`Seeded ${quiz.title} with ${questionsToInsert.length} questions.`);
    }

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding:", err);
    process.exit(1);
  }
}

seed();
