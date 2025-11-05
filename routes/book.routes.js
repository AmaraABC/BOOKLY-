import express from "express";
import BookController from "../controllers/book.controller.js";

const router = express.Router();

router.get("/", BookController.getBooks);
router.post("/", BookController.createBook);

export default router;