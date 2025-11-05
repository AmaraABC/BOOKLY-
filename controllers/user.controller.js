import User from "../models/user.model.js";

class UserController {
    static async getUsers(req, res, next) {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    }

    static async createUser(req, res, next) {
        try {
            const { username, email } = req.body;

            if (!username || !email) {
                return res.status(400).json({ error: "username (string) et email (string) sont requis" });
            }

            const user = await User.create({ username, email });
            return res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    }
}

export default UserController;