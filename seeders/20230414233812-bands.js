'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('band', [
      { name: 'The Useful Books', 
      genre: 'Rock', 
      available_start_time: '2023-06-22 11:00:00', 
      end_time: '2023-06-22 23:00:00' }
    ])
  },

  down: async (queryInterface, Sequelize) => { 
    await queryInterface.bulkDelete('band', null, {}) } }