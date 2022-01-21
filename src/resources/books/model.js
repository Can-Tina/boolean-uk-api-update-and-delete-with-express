const db = require("../../utils/database");
const { buildBooksDatabase } = require("../../utils/mockData");

function Book() {
  function createTable() {
    const sql = `
      DROP TABLE IF EXISTS books;
      
      CREATE TABLE IF NOT EXISTS books (
        id              SERIAL        PRIMARY KEY,
        title           VARCHAR(255)   NOT NULL,
        type            VARCHAR(255)   NOT NULL,
        author          VARCHAR(255)   NOT NULL,
        topic           VARCHAR(255)   NOT NULL,
        publicationDate DATE           NOT NULL
      );
    `;

    return db
      .query(sql)
      .then((result) => console.log("[DB] Book table ready."))
      .catch(console.error);
  }

  function mockData() {
    const createBook = `
      INSERT INTO books
        (title, type, author, topic, publicationDate)
      VALUES
        ($1, $2, $3, $4, $5)
    `;

    const books = buildBooksDatabase();

    books.forEach((book) => {
      db.query(createBook, Object.values(book)).catch(console.error);
    });
  }

  createTable().then(() => {
    console.log("\nCreating mock data for Books...\n");

    mockData();
  });
}

async function createNewBook(bookData) {
  const createOneSQL = `
    INSERT INTO books 
      (title, type, author, topic, publicationDate) 
    VALUES 
      ($1,$2,$3,$4,$5) 
    RETURNING *;`;

  let createResult = {}

  await db
    .query(createOneSQL, [bookData.title, bookData.type, bookData.author, bookData.topic, new Date(bookData.publicationDate)])
    .then(result => createResult = result.rows[0])
    .catch(error => {
      createResult = {
        error: {
          message: "DB error, could not create book: " + error.message,
          bookToCreate: bookData,
          code: error.code
        }
      }
    });

  return createResult;
}

async function getAllFictionBooks() {
  const getAllFictionSQL = `
  SELECT *
  FROM books
  WHERE type = 'Fiction'`;

  let createResult = {}

  await db
    .query(getAllFictionSQL)
    .then(result => createResult = result.rows)
    .catch(error => {
      createResult = {
        error: {
          message: "DB error, could not get fiction: " + error.message,
          bookToCreate: bookData,
          code: error.code
        }
      }
    });

  return createResult;
}

async function getAllNonFictionBooks() {
  const getAllNonFictionSQL = `
  SELECT *
  FROM books
  WHERE type = 'Non-Fiction'`;

  let createResult = {}

  await db
    .query(getAllNonFictionSQL)
    .then(result => createResult = result.rows)
    .catch(error => {
      createResult = {
        error: {
          message: "DB error, could not get fiction: " + error.message,
          bookToCreate: bookData,
          code: error.code
        }
      }
    });

  return createResult;
}

async function getFictionBooksByTopic(topic) {
  const getFictionByTopicSQL = `
  SELECT *
  FROM books
  WHERE type = 'Fiction' AND topic = $1`;

  let createResult = {}

  await db
    .query(getFictionByTopicSQL, [topic])
    .then(result => createResult = result.rows)
    .catch(error => {
      createResult = {
        error: {
          message: "DB error, could not get fiction: " + error.message,
          bookToCreate: bookData,
          code: error.code
        }
      }
    });

  return createResult;
}

async function getNonFictionBooksByTopic(topic) {
  const getNonFictionByTopicSQL = `
  SELECT *
  FROM books
  WHERE type = 'Non-Fiction' AND topic = $1`;

  let createResult = {}

  await db
    .query(getNonFictionByTopicSQL, [topic])
    .then(result => createResult = result.rows)
    .catch(error => {
      createResult = {
        error: {
          message: "DB error, could not get fiction: " + error.message,
          bookToCreate: bookData,
          code: error.code
        }
      }
    });

  return createResult;
}

async function getBooksByAuthor(author) {
  const getBooksByAuthorSQL = `
  SELECT *
  FROM books
  WHERE author = $1
  ORDER BY publicationdate DESC`;

  let createResult = {}

  await db
    .query(getBooksByAuthorSQL, [author])
    .then(result => createResult = result.rows)
    .catch(error => {
      createResult = {
        error: {
          message: "DB error, could not get fiction: " + error.message,
          bookToCreate: bookData,
          code: error.code
        }
      }
    });

  return createResult;
}

async function updateBookId(bookData) {
  const updateBookIdSQL = `
    UPDATE books  
    SET title = $1
    WHERE id = $2
    RETURNING *;`;

  let createResult = {}

  await db
    .query(updateBookIdSQL, [bookData.title, bookData.id])
    .then(result => createResult = result.rows[0])
    .catch(error => {
      createResult = {
        error: {
          message: "DB error, could not create book: " + error.message,
          bookToCreate: bookData,
          code: error.code
        }
      }
    });

  return createResult;
}

async function updateBookTitle(bookData) {
  const updateBookTitleSQL = `
    UPDATE books  
    SET author = $1
    WHERE title = $2
    RETURNING *;`;

  let createResult = {}

  await db
    .query(updateBookTitleSQL, [bookData.author, bookData.title])
    .then(result => createResult = result.rows[0])
    .catch(error => {
      createResult = {
        error: {
          message: "DB error, could not create book: " + error.message,
          bookToCreate: bookData,
          code: error.code
        }
      }
    });

  return createResult;
}

async function deleteBookId(id) {
  const deleteBookIdSQL = `
  DELETE FROM books
  WHERE id = $1`;

  let createResult = {}

  await db
    .query(deleteBookIdSQL, [id])
    .then(result => createResult = result.rows)
    .catch(error => {
      createResult = {
        error: {
          message: "DB error, could not get fiction: " + error.message,
          bookToCreate: bookData,
          code: error.code
        }
      }
    });

  return createResult;
}

module.exports = {
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
};