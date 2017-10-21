'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('answers', ['user_id', 'poll_id'], { indicesType: 'UNIQUE' });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('answers', ['user_id', 'poll_id']);
  }
};
