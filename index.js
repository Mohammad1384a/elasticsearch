const { indexRouter } = require("./router/index.router");
const experss = require("express");
const app = experss();
const createError = require("http-errors");
require("dotenv").config();
const { PORT } = process.env;
app.use(experss.urlencoded({ extended: true }));
app.use(experss.json());
app.use(indexRouter);

app.use((req, res, next) => {
  return next(createError.NotFound("Not Found Page"));
});
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message ?? err.msg ?? "Internal Server Error",
  });
});
const server = require("http").createServer(app);

server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
