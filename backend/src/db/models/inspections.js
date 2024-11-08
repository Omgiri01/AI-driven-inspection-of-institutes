const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const inspections = sequelize.define(
    'inspections',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      scheduled_date: {
        type: DataTypes.DATE,
      },

      completion_date: {
        type: DataTypes.DATE,
      },

      report: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  inspections.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.inspections.belongsTo(db.users, {
      as: 'inspector',
      foreignKey: {
        name: 'inspectorId',
      },
      constraints: false,
    });

    db.inspections.belongsTo(db.institutes, {
      as: 'institute',
      foreignKey: {
        name: 'instituteId',
      },
      constraints: false,
    });

    db.inspections.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.inspections.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return inspections;
};
