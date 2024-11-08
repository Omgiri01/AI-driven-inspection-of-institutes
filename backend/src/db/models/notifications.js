const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const notifications = sequelize.define(
    'notifications',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      message: {
        type: DataTypes.TEXT,
      },

      sent_at: {
        type: DataTypes.DATE,
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

  notifications.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.notifications.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.notifications.belongsTo(db.institutes, {
      as: 'institute',
      foreignKey: {
        name: 'instituteId',
      },
      constraints: false,
    });

    db.notifications.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.notifications.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return notifications;
};
