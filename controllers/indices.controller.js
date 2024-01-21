const createError = require("http-errors");
const { elasticClient } = require("../config/elastic.config");

async function createNewIndex(req, res, next) {
  try {
    const { indexName } = req.body;
    if (!indexName) {
      return createError.BadRequest("invalid name sent");
    }
    const createIndice = await elasticClient.indices.create({
      index: indexName,
    });
    return res.json({
      createIndice,
    });
  } catch (error) {
    return next(createError.InternalServerError(error));
  }
}

async function getIndices(req, res, next) {
  try {
    const indices = await elasticClient.indices.getAlias();
    const result = Object.keys(indices).filter((i) => !i.startsWith("."));
    return res.json(result);
  } catch (error) {
    return next(createError.InternalServerError(error));
  }
}

module.exports = {
  createNewIndex,
  getIndices,
};
