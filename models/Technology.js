import mongoose from 'mongoose';

const TechnologySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  icon: { type: String },
  color: { type: String }, // keeping color from existing db.json
  order: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Technology || mongoose.model('Technology', TechnologySchema);
