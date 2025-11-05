import Book from "../models/book.model.js";

class BookController {
    static async getBooks(req, res, next) {
        try {
            const books = await Book.findAll();
            return res.status(200).json(books);
        } catch (e) {
            next(e);
        }
    }

    static async createBook(req, res, next) {
        try {
            const { title, author, available } = req.body;

            if (!title || !author) {
                return res.status(400).json({ error: "title (string) et author (string) sont requis" });
            }

            if (!available) {
                return res.status(400).json({ error: "available must be a boolean !!" })
            }

            const book = await Book.create({ title, author, available });
            return res.status(201).json(book);
        } catch (e) {
            next(e);
        }
    }
}

export default BookController;