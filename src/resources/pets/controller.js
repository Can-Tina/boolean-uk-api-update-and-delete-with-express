const {
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
} = require("./model");

//Pet().init();

async function createPet(req, res) {
  const petToCreate = {
    ...req.body
  };

  const createPet = Pet.createPet;
  const thisRes = await createNewPet(petToCreate, res);
  return res.json({ data: thisRes });
}

async function getAllPetTypes(req, res) {
  const thisRes = await getPetTypesList(res);
  console.log("Getting All Types")
  return res.json({ data: thisRes });
}

async function getPetByType(req, res) {
  const typeToGet = req.params.type

  const thisRes = await getAllPetsByType(typeToGet);
  console.log("Getting Pets By Type")
  return res.json({ data: thisRes });
}

async function getPetByTypeAndBreed(req, res) {
  const typeToGet = req.params.type
  const breedToGet = req.params.breed

  const thisRes = await getAllPetsByTypeAndBreed(typeToGet, breedToGet);
  console.log("Getting Pets By Type And Breed")
  return res.json({ data: thisRes });
}

async function getNoMicrochip(req, res) {
  const thisRes = await getNoMicrochipList(res);
  console.log("Getting Pets By Microchip")
  return res.json({ data: thisRes });
}

async function getPetByTypeAndMicrochip(req, res) {
  const typeToGet = req.params.type

  const thisRes = await getAllPetsByTypeAndMicrochip(typeToGet);
  console.log("Getting Pets By Type And Microchip")
  return res.json({ data: thisRes });
}

async function updatePetById(req, res) {
  const petToUpdate = {
    id: req.params.id,
    ...req.body
  }

  const thisRes = await updatePetId(petToUpdate, res);
  return res.json({ data: thisRes });
}

async function updatePetByName(req, res) {
  const petToUpdate = {
    name: req.params.name,
    ...req.body
  }

  const thisRes = await updatePetName(petToUpdate, res);
  return res.json({ data: thisRes });
}

async function deletePetById(req, res) {
  const petToDelete = req.params.id

  const thisRes = await deletePetId(petToDelete);
  return res.json({ data: thisRes });
}

module.exports = {
  createPet,
  getAllPetTypes,
  getPetByType,
  getPetByTypeAndBreed,
  getNoMicrochip,
  getPetByTypeAndMicrochip,
  updatePetById,
  updatePetByName,
  deletePetById
};