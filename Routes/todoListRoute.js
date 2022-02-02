const { Router, application } = require("express");
const router = new Router();
const TodoLists = require("../models").todoList;
const Users = require("../models").user;

router.get("/", async (req, res, next) => {
  const getAllTodoList = await TodoLists.findAll();
  res.status(200).send({
    message: "this is all the todo lists",
    getAllTodoList: getAllTodoList,
  });
});

///TODO LIST:

// get all todo lists
//http GET :3002/todoLists
router.get("/", async (req, res, next) => {
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
router.get("/:id", async (req, res, next) => {
  try {
    const params = req.params;
    const todoListId = parseInt(req.params.id);
    console.log("this is my todoList Id", todoListId);
    const todoListsById = await TodoLists.findByPk(todoListId);
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
// http POST :3005/todoLists name=newList userId=1
router.post("/", async (req, res, next) => {
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
        const newTodoList = await TodoLists.create({
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
router.delete("/:id", async (req, res, next) => {
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

module.exports = router;
