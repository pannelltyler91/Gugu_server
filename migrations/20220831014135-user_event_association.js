'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('calendar',{
      fields:['user_id'],
      type:'foriegn key',
      name:'user_event_association',
      references:{
        table:'user',
        field:'id'
      }

    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('calendar',{
      fields:['user_id'],
      type:'foriegn key',
      name:'user_event_association',
      references:{
        table:'user',
        field:'id'
      }

    })
  }
};
