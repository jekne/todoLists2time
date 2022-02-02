// const express = require("express");
// const app = express();
// const PORT = 3004;

// const logginMidleware = (req, res, next) => {
//   const currentTime = new Date();
//   console.log("request received at", currentTime);
//   res.setHeader("X-Codaisseur", currentTime);
//   next();
// };

// const failRandomlyMiddleware = (req, res, next) => {
//   if (Math.random() * 2 >= 1) {
//     next();
//   } else {
//     res.status(500).end();
//   }
// };

// app.use(logginMidleware);
// app.get("/", failRandomlyMiddleware, async (req, res) => {
//   res.send("Hello");
// });
// app.listen(PORT, () => {
//   console.log("I am listening the port", PORT);
// });
const express = require("express");
const app = express();
const port = 3004;

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({
    message: "We received your request body!",
  });
});
app.listen(port, () => console.log("listening on port " + port));
