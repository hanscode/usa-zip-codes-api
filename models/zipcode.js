"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ZipCode extends Model {}
  ZipCode.init(
    {
      zip: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      latitude: {
        type: DataTypes.STRING,
      },

      longitude: {
        type: DataTypes.STRING,
      },
    },
    { sequelize,
        timestamps: false,
    }
  );

  return ZipCode;
};
