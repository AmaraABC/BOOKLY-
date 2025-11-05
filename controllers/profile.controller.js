import Profile from "../models/profile.model.js";

export default class ProfileController {
    static async getProfile(req, res, next) {
        try {
            const profile = await Profile.findOne({ _id: req.params._id });
            if (!profile) return res.status(404).json({ error: 'Profile not found' });
            res.json(profile);
        } catch (err) {
            next(err);
        }
    }

    static async createProfile(req, res, next) {
        try {
            const { _id, preferences, history } = req.body;
            const existing = await Profile.findOne({ _id });
            if (existing) return res.status(400).json({ error: 'Profile already exists' });
            const profile = await Profile.create({ _id, preferences, history });
            res.status(201).json(profile);
        } catch (err) {
            next(err);
        }
    }

    static async updateProfile(req, res, next) {
        try {
            const updates = req.body;
            const profile = await Profile.findOneAndUpdate(
                { _id: req.params._id },
                { $set: updates },
                { new: true }
            );
            if (!profile) return res.status(404).json({ error: 'Profile not found' });
            res.json(profile);
        } catch (err) {
            next(err);
        }
    }
}
