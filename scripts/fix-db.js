import mongoose from 'mongoose';

const uri = "mongodb+srv://azimjonjalilovking1301_db_user:JhNcCeVZtVDZam3u@it-quiz-cluster.sdf3p7h.mongodb.net/it_quiz";

async function fix() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");
    
    const TechnologySchema = new mongoose.Schema({}, { strict: false });
    const Technology = mongoose.models.Technology || mongoose.model('Technology', TechnologySchema);
    
    const ThemeSchema = new mongoose.Schema({}, { strict: false });
    const Theme = mongoose.models.Theme || mongoose.model('Theme', ThemeSchema);
    
    const QuestionSchema = new mongoose.Schema({}, { strict: false });
    const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);

    await Technology.updateMany({}, { $set: { isPublished: true } });
    await Theme.updateMany({}, { $set: { isPublished: true } });
    await Question.updateMany({}, { $set: { isPublished: true } });

    console.log("Fixed isPublished flags for all collections.");
    process.exit(0);
  } catch (error) {
    console.error("Failed to fix:", error);
    process.exit(1);
  }
}

fix();
