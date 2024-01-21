const { Router } = require("express");
const router = Router();
const { createBlog } = require("../controllers/blog.controller");

router.post("/create", createBlog);

module.exports = {
  blogRouter: router,
};
