import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional because Google OAuth users might not have a password
  image: { type: String },
  role: { type: String, enum: ['admin', 'student', 'guest'], default: 'student' },
  provider: { type: String, enum: ['credentials', 'google'], default: 'credentials' }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
