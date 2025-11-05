import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";

export default class FullController {
    static async getFullUser(req, res, next) {
        try {
            const _id = req.params.id;

            const user = await User.findById(_id);
            if (!user) return res.status(404).json({ error: "User not found" });

            const profile = await Profile.findOne({ _id: _id.toString() });

            return res.json({
                user,
                profile: profile ? {
                    preferences: profile.preferences,
                    history: profile.history
                } : null
            });

        } catch (err) {
            next(err);
        }
    }
};