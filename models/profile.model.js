import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    preferences: { type: Object, default: {} },
    history: { type: Array, default: [] },
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
