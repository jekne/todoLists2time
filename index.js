// const express = require("express");
// const Users = require("./models").user;
// const Todolists = require("./models").todoList;
// const TodoItems = require("./models").todoItem;

// const app = express();

// const PORT = 3002;

// app.get("/users", async (req, res) => {
//   try {
//     const users = await Users.findAll();
//     res.send(users);
//     console.log("i received a request", req);
//   } catch (error) {}
// });

// app.get("/todoList", async (req, res) => {
//   try {
//     const findTodoLists = await Todolists.findAll();
//     res.send(findTodoLists);
//   } catch (error) {}
// });
// //http -v GET :3002/todoList/1
// app.get("/todoList/:id", async (req, res) => {
//   try {
//     const userId = req.params.id;
//     console.log("this is my params", userId);
//     const todoByid = await Todolists.findByPk(userId);
//     res.send(todoByid);
//   } catch (error) {}
// });
// //http -v GET :3002/test
// app.get("/test", async (req, res) => {
//   try {
//     const lists = await Todolists.findAll({ include: Users });
//     res.send(lists);
//   } catch (error) {}
// });
// app.put;

// app.get("/users/:id", async (req, res) => {
//   try {
//     const params = req.params;
//     console.log("this is my params", params);
//     const userId = parseInt(req.params.id);
//     const findUser = await Users.findByPk(userId, { include: Todolists });
//     res.status(200).send({
//       message: "this is the user requested and his todo List",
//       findUser: findUser,
//     });
//   } catch (error) {
//     next(e);
//   }
// });

// // Get important TodoItems with the name of the list they belong to.
// app.get("/important", async (req, res) => {
//   try {
//     console.log("i received a request", req);
//     const importantItems = await TodoItems.findAll({
//       where: { important: true },
//       include: { model: Todolists, attributes: ["name"] },
//     });
//     res.status(200).send({
//       message: "this is the todo item important with the name of the list",
//       importantItems: importantItems,
//     });
//   } catch (error) {}
// });
// // Get one user by id with his lists, which also contain their belonging TodoItem's task attribute.

// app.get("/userwithlists/:id", async (req, res) => {
//   try {
//     const params = req.params;
//     const userId = parseInt(req.params.id);
//     console.log("this is my user id", userId);

//     const findUser = await Users.findByPk(userId, {
//       include: [
//         {
//           model: Todolists,
//           attributes: ["name"],
//           include: { model: TodoItems, attributes: ["task"] },
//         },
//       ],
//     });
//     res.status(200).send({
//       message: "this is the ueser with his list and the task and attributes",
//       findUser: findUser,
//     });
//   } catch (error) {}
// });

// app.listen(PORT, () => {
//   console.log("I am listening the port", PORT);
// });

const express = require("express");

const app = express();
const PORT = 3002;

const Users = require("./models").user;
const Todolists = require("./models").todoList;
const TodoItems = require("./models").todoItem;

app.use(express.json());

//test your setup
//http POST :3002/echo hello=world
app.post("/echo", (req, res) => {
  res.json(req.body);
});

//USERS:

//get all the users
//http GET :3002/users
app.get("/users", async (req, res) => {
  const getAllUsers = await Users.findAll();
  res
    .status(200)
    .send({ message: "here are the users", getAllUsers: getAllUsers });
});

//get  the users by id
//http GET :3002/users/1
app.get("/users/:id", async (req, res, next) => {
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
app.post("/users", async (req, res, next) => {
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

app.put("/users/:id", async (req, res, next) => {
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

///TODO LIST:

// get all todo lists
//http GET :3002/todoLists
app.get("/todoLists", async (req, res, next) => {
  try {
    const allTodoLists = await Todolists.findAll();
    res.status(200).send({
      message: "this is all the todo Lists",
      allTodoLists: allTodoLists,
    });
  } catch (e) {
    next(e);
  }
});

// get  todo lists by id
//http GET :3002/todoLists/1
app.get("/todoLists/:id", async (req, res, next) => {
  try {
    const params = req.params;
    const todoListId = parseInt(req.params.id);
    console.log("this is my todoList Id", todoListId);
    const todoListsById = await Todolists.findByPk(todoListId);
    if (!todoListsById) {
      res.status(200).send("Todo list not Found");
    }
    res.status(200).send({
      message: `this is the todo Lists by the todoListId ${todoListId}`,
      todoListsById: todoListsById,
    });
  } catch (e) {
    next(e);
  }
});

//create a todo List with a userId
//check if the user id match
// http POST :3002/todoLists name=newList userId=1
app.post("/todoLists", async (req, res, next) => {
  try {
    const { name, userId } = req.body;

    if (!name) {
      res.status(404).send("Necessary a name for the Todo List");
    }

    if (!userId) {
      res.status(404).send("You need a userId");
    } else {
      const userIdExist = await Todolists.findByPk(userId);

      if (!userIdExist) {
        res
          .status(404)
          .send("User id do not correspond with a user Id that already exist");
      } else {
        const newTodoList = await Todolists.create({
          name: name,
          userId: userId,
        });
        if (!newTodoList) {
          res.status(404).send("todo list not created, somethig wrong");
        }
        res.status(200).send({
          message: "Todo list created",
          newTodoList: newTodoList,
        });
      }
    }
  } catch (e) {
    next(e);
  }
});

//delete a todolist
// http -v DELETE :3002/todolists/1
app.delete("/todolists/:id", async (req, res, next) => {
  try {
    const params = req.params;
    console.log("this is my params", params);
    const todoListId = parseInt(req.params.id);
    console.log("this is my todo list id", todoListId);
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => {
  console.log("I am listening the port", PORT);
});
