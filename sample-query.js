// const User = require("./models").user;
// const { Op } = require("sequelize");

// async function getAllUsers() {
//   try {
//     const allUsers = await User.findAll({ raw: true });
//     // const specificUser = await User.findOne({ where: { name: "RONALDO" } });
//     return allUsers;
//     // return specificUser;
//   } catch (error) {
//     console.log(e);
//   }
// }
// getAllUsers().then((users) => console.log(users));

const User = require("./models").user;

async function getAllUsers() {
  try {
    const allUsers = await User.findAll();
    return allUsers;
  } catch (e) {
    console.log(e);
  }
}

getAllUsers().then((users) => console.log(users));
