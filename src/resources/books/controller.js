/*const Book = require("./model");
const createNewBook = require("./model");
const getAllFictionBooks = require("./model");*/

const {
  Book,
  createNewBook,
  getAllFictionBooks,
  getFictionBooksByTopic,
  getAllNonFictionBooks,
  getNonFictionBooksByTopic,
  getBooksByAuthor,
  updateBookId,
  updateBookTitle,
  deleteBookId
} = require("./model")

//Book().init();

async function createBook(req, res) {
  const bookToCreate = {
    ...req.body
  };

  const createBook = Book.createBook;
  const thisRes = await createNewBook(bookToCreate, res);
  return res.json({ data: thisRes });
}

async function getAllFiction(req, res) {

  console.log("queries:", req.query)

  if (req.query.topic !== undefined) {
    const topicToGet = req.query.topic

    const thisRes = await getFictionBooksByTopic(topicToGet);
    console.log("Getting Fiction By Topic")
    return res.json({ data: thisRes });
  } else {
    const thisRes = await getAllFictionBooks(res);
    console.log("Getting All Fiction")
    return res.json({ data: thisRes });
  }
}

async function getAllNonFiction(req, res) {

  if (req.query.topic !== undefined) {
    const topicToGet = req.query.topic

    const thisRes = await getNonFictionBooksByTopic(topicToGet);
    console.log("Getting NonFiction By Topic")
    return res.json({ data: thisRes });
  } else {
    const thisRes = await getAllNonFictionBooks(res);
    console.log("Getting All NonFiction")
    return res.json({ data: thisRes });
  }
}

/*async function getFictionByTopic(req, res) {
  const topicToGet = req.params.topic

  const thisRes = await getFictionBooksByTopic(topicToGet);
  console.log("Getting Fiction By Topic")
  return res.json({ data: thisRes });
}*/

/*async function getNonFictionByTopic(req, res) {
  const topicToGet = req.params.topic

  const thisRes = await getNonFictionBooksByTopic(topicToGet);
  console.log("Getting NonFiction By Topic")
  return res.json({ data: thisRes });
}*/

async function getByAuthor(req, res) {
  const authorToGet = req.params.author

  const thisRes = await getBooksByAuthor(authorToGet);
  console.log("Getting By Author")
  return res.json({ data: thisRes });
}

async function updateBookById(req, res) {
  const bookToUpdate = {
    id: req.params.id,
    ...req.body
  }

  const thisRes = await updateBookId(bookToUpdate, res);
  return res.json({ data: thisRes });
}

async function updateBookByTitle(req, res) {
  const bookToUpdate = {
    title: req.params.title,
    ...req.body
  }
  console.log(bookToUpdate)

  const thisRes = await updateBookTitle(bookToUpdate, res);
  return res.json({ data: thisRes });
}

async function deleteBookById(req, res) {
  const bookToDelete = req.params.id

  const thisRes = await deleteBookId(bookToDelete);
  return res.json({ data: thisRes });
}

module.exports = {
  createBook,
  getAllFiction,
  getAllNonFiction,
  getByAuthor,
  updateBookById,
  updateBookByTitle,
  deleteBookById
};