const express = require("express");

const {
  getClients,
  addClient,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

const router = express.Router();

router.get("/", getClients);
router.post("/", addClient);
router.get("/:id", getClientById);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

module.exports = router;