const { Router } = require("express");
const router = Router();
const {
  createBlog,
  getAllBlogs,
  removeBlogById,
} = require("../controllers/blog.controller");

router.post("/create", createBlog);
router.get("/all/:value?", getAllBlogs);
router.delete("/remove/:id", removeBlogById);

module.exports = {
  blogRouter: router,
};
