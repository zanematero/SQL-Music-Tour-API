'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stage_event', {
      stage_event_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stage_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'stage', key: 'stage_id' }
      },
      event_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'event', key: 'event_id' }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('stage_event');
  }
};