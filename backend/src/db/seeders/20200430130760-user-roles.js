const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('SuperAdmin'),
        name: 'Super Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('chief_inspector'),
        name: 'chief_inspector',
        createdAt,
        updatedAt,
      },

      {
        id: getId('inspection_manager'),
        name: 'inspection_manager',
        createdAt,
        updatedAt,
      },

      {
        id: getId('compliance_officer'),
        name: 'compliance_officer',
        createdAt,
        updatedAt,
      },

      { id: getId('data_analyst'), name: 'data_analyst', createdAt, updatedAt },

      {
        id: getId('policy_advisor'),
        name: 'policy_advisor',
        createdAt,
        updatedAt,
      },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'inspections',
      'notifications',
      'roles',
      'permissions',
      'institutes',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.bulkUpdate(
      'roles',
      { globalAccess: true },
      { id: getId('SuperAdmin') },
    );

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('chief_inspector'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('chief_inspector'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('chief_inspector'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('chief_inspector'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('inspection_manager'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('inspection_manager'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('inspection_manager'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('compliance_officer'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('compliance_officer'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('data_analyst'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('policy_advisor'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('chief_inspector'),
        permissionId: getId('CREATE_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('chief_inspector'),
        permissionId: getId('READ_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('chief_inspector'),
        permissionId: getId('UPDATE_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('chief_inspector'),
        permissionId: getId('DELETE_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('inspection_manager'),
        permissionId: getId('CREATE_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('inspection_manager'),
        permissionId: getId('READ_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('inspection_manager'),
        permissionId: getId('UPDATE_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('inspection_manager'),
        permissionId: getId('DELETE_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('compliance_officer'),
        permissionId: getId('CREATE_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('compliance_officer'),
        permissionId: getId('READ_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('compliance_officer'),
        permissionId: getId('UPDATE_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('compliance_officer'),
        permissionId: getId('DELETE_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('data_analyst'),
        permissionId: getId('READ_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('data_analyst'),
        permissionId: getId('UPDATE_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('data_analyst'),
        permissionId: getId('DELETE_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('policy_advisor'),
        permissionId: getId('READ_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('policy_advisor'),
        permissionId: getId('UPDATE_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('chief_inspector'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('chief_inspector'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('chief_inspector'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('chief_inspector'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('inspection_manager'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('inspection_manager'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('inspection_manager'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('inspection_manager'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('compliance_officer'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('compliance_officer'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('compliance_officer'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('compliance_officer'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('data_analyst'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('data_analyst'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('data_analyst'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('policy_advisor'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('policy_advisor'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('chief_inspector'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('inspection_manager'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('compliance_officer'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('data_analyst'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('policy_advisor'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_INSPECTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_INSPECTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_INSPECTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_INSPECTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_INSPECTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_INSPECTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_INSPECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_INSTITUTES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_INSTITUTES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_INSTITUTES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_INSTITUTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'chief_inspector',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'inspection_manager',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
