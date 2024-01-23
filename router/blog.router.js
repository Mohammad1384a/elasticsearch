const { Router } = require("express");
const router = Router();
const {
  createBlog,
  updateBlog,
  getAllBlogs,
  removeBlogById,
  searchByTitle,
  multiFieldSearch,
} = require("../controllers/blog.controller");

router.post("/create", createBlog);
router.get("/all/:value?", getAllBlogs);
router.delete("/remove/:id", removeBlogById);
router.put("/update/:id", updateBlog);
router.get("/search/title", searchByTitle);
router.get("/search/multi", multiFieldSearch);

module.exports = {
  blogRouter: router,
};
