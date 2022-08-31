'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class calendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      calendar.belongsTo(models.user);
      models.user.hasMany(calendar);
    }
  }
  calendar.init({
    date: DataTypes.STRING,
    event: DataTypes.STRING,
    time: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'calendar',
  });
  return calendar;
};