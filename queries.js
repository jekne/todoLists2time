const User = require("./models").user;
const TodoItem = require("./models").todoItem;
console.log("this is my todo item", TodoItem);
console.log("this is my USER", User);
// Searches for all users and logs them.

async function getUsers() {
  try {
    // const findUsers = await User.findAll();
    // return findUsers.map((user) => user.get({ plain: true }));
    const getUsers = await User.findAll({ raw: true });
    return getUsers;
  } catch (error) {}
}
// getUsers().then((users) => console.log(users));
// Searches for all TodoItems and logs them (use .toJSON() or { raw: true } in the query).
async function getAlltodoItems() {
  try {
    const allTodoItems = await TodoItem.findAll({ raw: true });
    return allTodoItems;
  } catch (error) {
    console.error(e);
  }
}

// getAlltodoItems().then((x) => console.log(x));
// Searches for a user by primary key.

async function findTheOne(key) {
  try {
    // const key = req.key;
    // console.log("this is my params", key);

    const theOne = await User.findByPk(key);
    return theOne ? theOne.get({ plain: true }) : "Not found!";
  } catch (error) {}
}
findTheOne(1).then((x) => console.log(x));

// Creates a new user.
// (Once you manage to create this user, delete or comment out the
//     function call as to not run it again, otherwise we'll get an error).

async function newUser({ name, email, password }) {
  const create = await User.create({ name, email, password });
  return create.get({ plain: true });
}
newUser({ name: "rein", email: "rein@codaisseur.com", password: 4232 }).then(
  (result) => console.log(result)
);

async function deleteUsr(key) {
  const findUser = await User.findByPk(key);
  // return delete.get({plain:true})
}
// Searches only for important TodoItems
