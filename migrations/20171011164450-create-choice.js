'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('choices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      poll_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'polls',
          key: 'id'
        },
        onDelete: 'cascade'
      }
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('choices');
  }
};