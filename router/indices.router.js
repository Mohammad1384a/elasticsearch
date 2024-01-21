const { Router } = require("express");
const router = Router();
const {
  createNewIndex,
  getIndices,
} = require("../controllers/indices.controller");

router.post("/create", createNewIndex);
router.get("/all", getIndices);

module.exports = {
  indicesRouter: router,
};
