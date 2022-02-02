const express = require("express");

const app = express();
const PORT = 3003;

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
// http POST :3003/todoLists name=newList userId=1
app.post("/todoLists", async (req, res, next) => {
  try {
    const { name, userId } = req.body;

    if (!name) {
      res.status(404).send("Necessary a name for the Todo List");
    }

    if (!userId) {
      res.status(404).send("You need a userId");
    } else {
      //remember to use the Users and not the todolist, because the userId belongs to users
      const userIdExist = await Users.findByPk(userId);

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
// http -v DELETE :3003/todolists/1
app.delete("/todolists/:id", async (req, res, next) => {
  try {
    const params = req.params;
    console.log("this is my params", params);
    const id = parseInt(req.params.id);
    console.log("this is my todo list id", id);

    if (!id) {
      res.status(404).send("necessary an todo list id to delete");
    } else {
      const checkidexist = await Todolists.findByPk(id);
      if (!checkidexist) {
        res.status(404).send("Id do not exist, provide a valid one");
      } else {
        const deleteTodoList = await checkidexist.destroy(id);
        if (!deleteTodoList) {
          res.status(404).send("somenthing went wrong");
        } else {
          res.status(200).send("Todo List destroyed with sucess");
        }
      }
    }
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => {
  console.log("I am listening the port", PORT);
});
