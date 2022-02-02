const { user, todoItem, todoList } = require("./models");

// async function listsWithUsers() {
//   const lists = await todoList.findAll({
//     include: [user],
//   });

//   return lists.map((list) => list.toJSON());
// }

// async function listsWithUsers() {
//   const lists = await todoList.findAll({
//     include: [{ model: user, attributes: ["email"] }],
//   });
//   return lists.map((list) => list.toJSON());
// }

// listsWithUsers().then((lists) => console.log(lists));

async function getUsers() {
  const allUsers = await user.findAll({
    include: { model: todoList, attributes: ["name"] },
  });
  return allUsers.map((user) => user.toJSON());
}

getUsers().then((users) => console.log(users));
