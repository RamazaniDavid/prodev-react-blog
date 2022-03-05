import express from "express";
import bodyParser from "body-parser";
import config from "./config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import logger from "morgan";
var createError = require("http-errors");

// import routes
import AuthRouter from "./routes/AuthRoutes";
import UserRouter from "./routes/UserRoutes";
import CategoryRouter from "./routes/CategoryRoutes";
import PostRouter from "./routes/PostRoutes";
import ProxyRouter from "./routes/ProxyRoutes";

// connect to mongoDB
mongoose
  .connect(config.mongoURL, {
    useNewUrlParser: true,
    dbName: "prodev-react-blog",
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();
// middlewares
//app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "*"); // enables all the methods to take place
  return next();
});

app.use(logger("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Api routes
app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);
app.use("/api/categories", CategoryRouter);
app.use("/api/posts", PostRouter);
app.use("/api/proxy", ProxyRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   console.log("404");
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   console.log(err);
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

export default app;
