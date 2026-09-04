import mongoose from 'mongoose';

const uri = "mongodb+srv://azimjonjalilovking1301_db_user:JhNcCeVZtVDZam3u@it-quiz-cluster.sdf3p7h.mongodb.net/it_quiz";

async function test() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully.");
    
    // We need to redefine the schema here to query it
    const TechnologySchema = new mongoose.Schema({}, { strict: false });
    const Technology = mongoose.models.Technology || mongoose.model('Technology', TechnologySchema);
    
    const count = await Technology.countDocuments();
    console.log("Technologies count:", count);
    
    const docs = await Technology.find().limit(2);
    console.log("Sample docs:", docs);
    
    process.exit(0);
  } catch (error) {
    console.error("Failed to connect or query:", error);
    process.exit(1);
  }
}

test();
