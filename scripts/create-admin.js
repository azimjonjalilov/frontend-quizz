import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const uri = "mongodb+srv://azimjonjalilovking1301_db_user:JhNcCeVZtVDZam3u@it-quiz-cluster.sdf3p7h.mongodb.net/it_quiz";

async function createAdmin() {
  try {
    await mongoose.connect(uri);
    
    const UserSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String },
      role: { type: String, default: 'student' },
      provider: { type: String, default: 'credentials' }
    }, { strict: false });
    
    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    const email = "admin@quiz.com";
    const plainPassword = "adminpassword";
    
    // Check if exists
    const existing = await User.findOne({ email });
    if (existing) {
      await User.deleteOne({ email }); // Delete old one just in case
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    await User.create({
      name: "Admin",
      email: email,
      password: hashedPassword,
      role: "admin",
      provider: "credentials"
    });

    console.log("Admin account created successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Failed:", error);
    process.exit(1);
  }
}

createAdmin();
