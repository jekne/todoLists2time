const express = require("express");
const app = express();

const PORT = 3005;

const userRouter = require("./Routes/userRoute");
const todoListRouter = require("./Routes/todoListRoute");
const todoItemRouter = require("./Routes/todoItemRoute");

// const logginMidleware = (req, res, next) => {
//   console.log("I got a request");
//   console.log("This is my request type");
//   next();
// };
// http GET :3005/midle
// app.get("/midle", logginMidleware, async (req, res, next) => {
//   console.log("I am in the Route");
//   res.send("testing my midleware");
//   next();
// });
//without the json express you cant find the body
app.use(express.json());

// app.use(logginMidleware);
app.use("/users", userRouter);
app.use("/todolists", todoListRouter);
app.use("/todoitems", todoItemRouter);

app.listen(PORT, () => {
  console.log("I am listening the PORT", PORT);
});
