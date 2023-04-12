'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('meet_greet', {
      meet_greet_id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      event_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'event', key: 'event_id' }
      },
      band_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'band', key: 'band_id' }
      },
      meet_start_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      meet_end_time: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('meet_greet');
  }
};