const db = require("../../utils/database");
const { buildAnimalDatabase } = require("../../utils/mockData");

function Pet() {
  function createTable() {
    const sql = `
      DROP TABLE IF EXISTS pets;

      CREATE TABLE IF NOT EXISTS pets (
        id        SERIAL        PRIMARY KEY,
        name      VARCHAR(255)   NOT NULL,
        age       INTEGER       NOT NULL,
        type      VARCHAR(255)   NOT NULL,
        breed     VARCHAR(255)   NOT NULL,
        microchip BOOLEAN       NOT NULL
      );
    `;

    return db
      .query(sql)
      .then((result) => console.log("[DB] Pet table ready."))
      .catch(console.error);
  }

  function mockData() {
    const createPet = `
      INSERT INTO pets
        (name, age, type, breed, microchip)
      VALUES
        ($1, $2, $3, $4, $5)
    `;

    const pets = buildAnimalDatabase();

    pets.forEach((pet) => {
      db.query(createPet, Object.values(pet));
    });
  }

  createTable().then(() => {
    console.log("\nCreating mock data for Pets...\n");

    mockData();
  });
}

async function createNewPet(petData) {
  const createOneSQL = `
    INSERT INTO pets 
      (name, age, type, breed, microchip) 
    VALUES 
      ($1,$2,$3,$4,$5) 
    RETURNING *;`;

  let createResult = {}

  await db
    .query(createOneSQL, [petData.name , petData.age, petData.type, petData.breed, new Boolean(petData.microchip)])
    .then(result => createResult = result.rows[0])
    .catch(error => {
      createResult = {
        error: {
          message: "DB error, could not create pet: " + error.message,
          petToCreate: petData,
          code: error.code
        }
      }
    });

  return createResult;
}

async function getPetTypesList() {
  const getPetTypesListSQL = `
  SELECT DISTINCT type
  FROM pets`;

  let createResult = {}

  await db
    .query(getPetTypesListSQL)
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

async function getAllPetsByType(type) {
  const getAllPetsByTypeSQL = `
  SELECT *
  FROM pets
  WHERE type = $1`;

  let createResult = {}

  await db
    .query(getAllPetsByTypeSQL, [type])
    .then(result => createResult = result.rows)
    .catch(error => {
      createResult = {
        error: {
          message: "DB error, could not get fiction: " + error.message,
          code: error.code
        }
      }
    });

  return createResult;
}

async function getAllPetsByTypeAndBreed(type, breed) {
  const getAllPetsByTypeAndBreedSQL = `
  SELECT *
  FROM pets
  WHERE type = $1 AND breed = $2`;

  let createResult = {}

  await db
    .query(getAllPetsByTypeAndBreedSQL, [type, breed])
    .then(result => createResult = result.rows)
    .catch(error => {
      createResult = {
        error: {
          message: "DB error, could not get fiction: " + error.message,
          code: error.code
        }
      }
    });

  return createResult;
}

async function getNoMicrochipList() {
  const getNoMicrochipListSQL = `
  SELECT *
  FROM pets
  WHERE microchip = false`;

  let createResult = {}

  await db
    .query(getNoMicrochipListSQL)
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

async function getAllPetsByTypeAndMicrochip(type) {
  const getAllPetsByTypeAndMicrochipSQL = `
  SELECT *
  FROM pets
  WHERE type = $1 AND microchip = false`;

  let createResult = {}

  await db
    .query(getAllPetsByTypeAndMicrochipSQL, [type])
    .then(result => createResult = result.rows)
    .catch(error => {
      createResult = {
        error: {
          message: "DB error, could not get fiction: " + error.message,
          code: error.code
        }
      }
    });

  return createResult;
}

async function updatePetId(petData) {
  const updatePetIdSQL = `
    UPDATE pets  
    SET name = $1
    WHERE id = $2
    RETURNING *;`;

  let createResult = {}

  await db
    .query(updatePetIdSQL, [petData.name, petData.id])
    .then(result => createResult = result.rows[0])
    .catch(error => {
      createResult = {
        error: {
          message: "DB error, could not create book: " + error.message,
          code: error.code
        }
      }
    });

  return createResult;
}

async function updatePetName(petData) {
  const updatePetNameSQL = `
    UPDATE pets  
    SET breed = $1
    WHERE name = $2
    RETURNING *;`;

  let createResult = {}

  await db
    .query(updatePetNameSQL, [petData.breed, petData.name])
    .then(result => createResult = result.rows[0])
    .catch(error => {
      createResult = {
        error: {
          message: "DB error, could not create book: " + error.message,
          code: error.code
        }
      }
    });

  return createResult;
}

async function deletePetId(id) {
  const deletePetIdSQL = `
  DELETE FROM pets
  WHERE id = $1`;

  let createResult = {}

  await db
    .query(deletePetIdSQL, [id])
    .then(result => createResult = result.rows)
    .catch(error => {
      createResult = {
        error: {
          message: "DB error, could not get fiction: " + error.message,
          code: error.code
        }
      }
    });

  return createResult;
}

module.exports = {
  Pet,
  createNewPet,
  getPetTypesList,
  getAllPetsByType,
  getAllPetsByTypeAndBreed,
  getNoMicrochipList,
  getAllPetsByTypeAndMicrochip,
  updatePetId,
  updatePetName,
  deletePetId
};
