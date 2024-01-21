const { elasticClient } = require("../config/elastic.config");
const createError = require("http-errors");

async function createBlog(req, res, next) {
  try {
    const { title, author, text } = req.body;
    const newBlog = await elasticClient.index({
      index: "blog",
      document: {
        title,
        author,
        text,
      },
    });
    return res.json(newBlog);
  } catch (error) {
    return next(createError.InternalServerError(error));
  }
}

module.exports = {
  createBlog,
};
