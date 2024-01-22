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

async function getAllBlogs(req, res, next) {
  try {
    const { value } = req.params;
    const blogs = await elasticClient.search({
      index: "blog",
      q: value,
    });
    //search by id
    // const blogId = await elasticClient.get({
    //   index: "blog",
    //   id: value,
    // });
    return res.json(blogs.hits.hits);
  } catch (error) {
    return next(createError.InternalServerError(error));
  }
}

async function removeBlogById(req, res, next) {
  try {
    const { id } = req.params;
    const deletionResult = await elasticClient.deleteByQuery({
      index: "blog",
      query: {
        match: {
          _id: id,
        },
      },
    });
    return res.json(deletionResult);
  } catch (error) {
    return next(createError.InternalServerError(error));
  }
}

module.exports = {
  createBlog,
  getAllBlogs,
  removeBlogById,
};
