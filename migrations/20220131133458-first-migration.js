"use strict";

const { query } = require("express");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "todoItems",
      "important",
      {
        type: Sequelize.BOOLEAN,
      },
      {}
    );
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("todoItems", "important", {});
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
