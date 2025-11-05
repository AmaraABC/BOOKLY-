import pool from "../config/db.postgres.js";

export default class User {
    #id; #username; #email;

    constructor({ id, username, email }) {
        this.#id = id;
        this.setUsername(username);
        this.setEmail(email);
    };

    get id() { return this.#id };
    get username() { return this.#username };
    get email() { return this.#email };

    setUsername(username) {
        if (typeof username !== "string" || !username.trim()) throw new Error("Invalid username");
        this.#username = username.trim();
    };

    setEmail(email) {
        if (typeof email !== "string" || !email.trim()) throw new Error("Invalid email");
        this.#email = email;
    };

    static nextId() { return Date.now() };

    static async create({ id, username, email }) {
        id = this.nextId();

        if (typeof username !== 'string' || !username.trim()) {
            throw new Error('Username must be a non-empty string');
        }
        if (typeof email !== 'string' || !email.trim()) {
            throw new Error('Email must be correct');
        }

        const query = `INSERT INTO users (id, username, email) VALUES ($1, $2, $3) RETURNING *;`;
        const values = [id, username, email];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async findAll() {
        const { rows } = await pool.query('SELECT * FROM users');
        return rows;
    };

    static async findById(id) {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return rows[0];
    }
};