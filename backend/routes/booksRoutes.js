import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// add books to database
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(404).send({
        message: "Send all require fields: title,author,publishYear ",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(error.code).send({ message: error.message });
  }
});

// get all books from database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//get book by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const books = await Book.findById(id);
    return res.status(200).json(books);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//update a book
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(404).send({
        message: "Send all require fields: title,author,publishYear ",
      });
    }

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(400).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book updated successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

//delete book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book was succesfully deleteed" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

export default router;
