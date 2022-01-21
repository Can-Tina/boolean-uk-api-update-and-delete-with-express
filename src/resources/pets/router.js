const express = require("express");

const { 
    createPet, 
    getAllPetTypes, 
    getPetByType, 
    getPetByTypeAndBreed, 
    getNoMicrochip, 
    getPetByTypeAndMicrochip,
    updatePetById, 
    updatePetByName,
    deletePetById
} = require("./controller");

const router = express.Router();

router.post("/", createPet);

router.get("/types", getAllPetTypes)

router.get("/microchip=false", getNoMicrochip)

router.get("/:type/breed=:breed", getPetByTypeAndBreed)

router.get("/:type/microchip=false", getPetByTypeAndMicrochip)

router.get("/:type", getPetByType)

router.patch("/id/:id", updatePetById)

router.patch("/name/:name", updatePetByName)

router.delete("/delete/:id", deletePetById)


module.exports = router;
