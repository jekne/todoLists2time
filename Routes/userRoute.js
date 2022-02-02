const { Router } = require("express");
const router = new Router();
const Users = require("../models").user;
const logginMidleware = require("../midleware");

//USERS:

//get all the users
//http GET :3005/users
router.get("/", async (req, res) => {
  const getAllUsers = await Users.findAll();
  res
    .status(200)
    .send({ message: "here are the users", getAllUsers: getAllUsers });
});

//get  the users by id
//http GET :3002/users/1
router.get("/:id", logginMidleware, async (req, res, next) => {
  try {
    const params = req.params;
    const userId = parseInt(req.params.id);
    console.log("This is my userId", userId);
    const findUserById = await Users.findByPk(userId);
    if (!findUserById) {
      res.status(404).send("this user doesnt exist");
    } else {
      res
        .status(200)
        .send({ message: "User found", findUserById: findUserById });
    }
  } catch (e) {
    next(e);
  }
});

//http POST :3002/users name=test email=hello@hello password=123
router.post("/", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      res.status(404).send("missing name");
    }
    if (!email) {
      res.status(404).send("missing email");
    }
    if (!password) {
      res.status(404).send("missing password");
    } else {
      const newUser = Users.create({
        name: name,
        email: email,
        password: password,
      });

      res.status(200).send({ message: "New user created", newUser: newUser });
    }
  } catch (e) {
    next(e);
  }
});

//update user
//http PUT :3002/users/1

router.put("/:id", async (req, res, next) => {
  try {
    const params = req.params;
    const userId = parseInt(req.params.id);
    console.log("My userId", userId);

    const findUserById = await Users.findByPk(userId);
    if (!findUserById) {
      res.status(404).send("User not found");
    } else {
      const updateUser = await findUserById.update(req.body);

      res.status(200).send({
        message: `User with this id ${userId} was updated`,
        updateUser: updateUser,
      });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
