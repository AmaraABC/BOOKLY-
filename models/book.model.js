import pool from "../config/db.postgres.js";

export default class Book {
    #id; #title; #author; #available;

    constructor({ id, title, author, available }) {
        this.#id = id;
        this.setTitle(title);
        this.setAuthor(author);
        this.setAvailability(available)
    };

    get id() { return this.#id };
    get title() { return this.#title };
    get author() { return this.#author };
    get available() { return this.#available };

    setTitle(title) {
        if (typeof title !== "string" || !title.trim()) throw new Error("Invalid title");
        this.#title = title;
    };

    setAuthor(author) {
        if (typeof author !== "string" || !author.trim()) throw new Error("Invalid author");
        this.#author = author.trim();
    };

    setAvailability(available) {
        if (typeof (available) !== "boolean") throw new Error("This must be a boolean");
        this.#available = available;
    };

    static nextId() { return Date.now() };

    static async create({ id, title, author, available }) {
        id = this.nextId();

        if (typeof title !== 'string' || !title.trim()) {
            throw new Error('title must be a non-empty string');
        }

        if (typeof author !== 'string' || !author.trim()) {
            throw new Error('author must be correct');
        }

        if (typeof (available) !== "boolean") throw new Error("This (available) must be a boolean !");

        const query = `INSERT INTO books (id, title, author, available) VALUES ($1, $2, $3, $4) RETURNING *;`;
        const values = [id, title, author, available];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async findAll() {
        const { rows } = await pool.query('SELECT * FROM books');
        return rows;
    };
};