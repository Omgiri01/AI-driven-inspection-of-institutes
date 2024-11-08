const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const institutes = sequelize.define(
    'institutes',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
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

  institutes.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.institutes.hasMany(db.users, {
      as: 'users_institute',
      foreignKey: {
        name: 'instituteId',
      },
      constraints: false,
    });

    db.institutes.hasMany(db.inspections, {
      as: 'inspections_institute',
      foreignKey: {
        name: 'instituteId',
      },
      constraints: false,
    });

    db.institutes.hasMany(db.notifications, {
      as: 'notifications_institute',
      foreignKey: {
        name: 'instituteId',
      },
      constraints: false,
    });

    //end loop

    db.institutes.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.institutes.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return institutes;
};
