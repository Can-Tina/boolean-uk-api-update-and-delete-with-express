const express = require("express");

const { createBook, getAllFiction, getAllNonFiction, getByAuthor, updateBookById, updateBookByTitle, deleteBookById } = require("./controller");

const router = express.Router();

router.post("/", createBook);

router.get("/fiction?topic=:topic", getAllFiction)

router.get("/fiction", getAllFiction)

router.get("/non-fiction", getAllNonFiction)

router.get("/non-fiction?topic=:topic", getAllNonFiction)

router.get("/author/:author/order=recent", getByAuthor)

router.patch("/id/:id", updateBookById)

router.patch("/title/:title", updateBookByTitle)

router.delete("/delete/:id", deleteBookById)

module.exports = router;
