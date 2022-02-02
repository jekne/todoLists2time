"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "todoItems",
      [
        {
          task: "Go to the gym",
          deadline: "Do everyday",
          todoListId: 1,
          important: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "Finish Homewor",
          deadline: "31/01/2022",
          todoListId: 1,
          important: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "Do the dishes",
          deadline: "when it is dirty",
          todoListId: 2,
          important: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "Brush teeths",
          deadline: "after meals",
          important: true,
          todoListId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "fixed bike",
          deadline: "until end of the week",
          todoListId: 3,
          important: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "play tennis",
          deadline: "saturday morning",
          important: false,
          todoListId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "recap about database",
          deadline: "do right now",
          important: true,
          todoListId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "Clean the room",
          deadline: "monday, wednesday and saturday",
          important: true,
          todoListId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "eat vegetables",
          deadline: "everyday",
          important: true,
          todoListId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("todoItems", null, {});
  },
};
