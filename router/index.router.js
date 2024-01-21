const router = require("express").Router();
const { indicesRouter } = require("./indices.router");
const { blogRouter } = require("./blog.router");

router.get("/", (req, res, next) => {
  res.send("you fucking pieace of shit");
});

router.use("/indice", indicesRouter);
router.use("/blog", blogRouter);

module.exports = {
  indexRouter: router,
};
