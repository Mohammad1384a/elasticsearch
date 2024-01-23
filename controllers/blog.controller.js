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

async function updateBlog(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    const validItems = ["author", "title", "text"];
    Object.keys(data).forEach((k) => {
      if (!validItems.includes(k) || !data[k] || data[k] === "") {
        delete data[k];
      }
    });
    const updateResult = await elasticClient.update({
      index: "blog",
      id,
      doc: data,
    });
    return res.json(updateResult);
  } catch (error) {
    return next(createError.InternalServerError(error));
  }
}

async function searchByTitle(req, res, next) {
  try {
    const { title } = req.body;
    const result = await elasticClient.search({
      index: "blog",
      query: {
        match: {
          title,
        },
      },
    });
    return res.json(result?.hits?.hits);
  } catch (error) {
    return next(createError.InternalServerError(error));
  }
}

async function multiFieldSearch(req, res, next) {
  try {
    const { value } = req.query;
    const result = await elasticClient.search({
      index: "blog",
      query: {
        multi_match: {
          query: value,
          fields: ["title", "author"],
        },
      },
    });
    return res.json(result?.hits?.hits);
  } catch (error) {
    return next(createError.InternalServerError(error));
  }
}

module.exports = {
  createBlog,
  searchByTitle,
  multiFieldSearch,
  getAllBlogs,
  removeBlogById,
  updateBlog,
};
