import mongoose from 'mongoose';

const uri = "mongodb+srv://azimjonjalilovking1301_db_user:JhNcCeVZtVDZam3u@it-quiz-cluster.sdf3p7h.mongodb.net/it_quiz";

async function makeAdmin() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");
    
    const UserSchema = new mongoose.Schema({}, { strict: false });
    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    // Get email from args
    const email = process.argv[2];
    if (!email) {
      console.log("Please provide an email address. Example: node scripts/make-admin.js test@test.com");
      process.exit(1);
    }

    const res = await User.updateOne({ email }, { $set: { role: 'admin' } });
    
    if (res.modifiedCount > 0) {
      console.log(`Successfully upgraded ${email} to admin role.`);
    } else {
      console.log(`No user found with email ${email} or they are already an admin.`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Failed:", error);
    process.exit(1);
  }
}

makeAdmin();
