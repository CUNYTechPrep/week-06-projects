'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      poll_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'polls',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      choice_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'choices',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('answers');
  }
};