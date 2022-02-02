async function logginMidleware(req, res, next) {
  console.log("I got a request");
  console.log("This is my request type");
  console.log("I am a midleware!!!");
  next();
}

module.exports = logginMidleware;
