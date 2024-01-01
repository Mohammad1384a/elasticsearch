const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("you fucking pieace of shit");
});

module.exports = {
  indexRouter: router,
};
