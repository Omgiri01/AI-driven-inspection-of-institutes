const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class InspectionsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const inspections = await db.inspections.create(
      {
        id: data.id || undefined,

        scheduled_date: data.scheduled_date || null,
        completion_date: data.completion_date || null,
        report: data.report || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await inspections.setInspector(data.inspector || null, {
      transaction,
    });

    await inspections.setInstitute(data.institute || null, {
      transaction,
    });

    return inspections;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const inspectionsData = data.map((item, index) => ({
      id: item.id || undefined,

      scheduled_date: item.scheduled_date || null,
      completion_date: item.completion_date || null,
      report: item.report || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const inspections = await db.inspections.bulkCreate(inspectionsData, {
      transaction,
    });

    // For each item created, replace relation files

    return inspections;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const inspections = await db.inspections.findByPk(id, {}, { transaction });

    await inspections.update(
      {
        scheduled_date: data.scheduled_date || null,
        completion_date: data.completion_date || null,
        report: data.report || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await inspections.setInspector(data.inspector || null, {
      transaction,
    });

    await inspections.setInstitute(data.institute || null, {
      transaction,
    });

    return inspections;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const inspections = await db.inspections.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of inspections) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of inspections) {
        await record.destroy({ transaction });
      }
    });

    return inspections;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const inspections = await db.inspections.findByPk(id, options);

    await inspections.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await inspections.destroy({
      transaction,
    });

    return inspections;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const inspections = await db.inspections.findOne(
      { where },
      { transaction },
    );

    if (!inspections) {
      return inspections;
    }

    const output = inspections.get({ plain: true });

    output.inspector = await inspections.getInspector({
      transaction,
    });

    output.institute = await inspections.getInstitute({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'inspector',
      },

      {
        model: db.institutes,
        as: 'institute',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.report) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('inspections', 'report', filter.report),
        };
      }

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              scheduled_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              completion_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
        };
      }

      if (filter.scheduled_dateRange) {
        const [start, end] = filter.scheduled_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            scheduled_date: {
              ...where.scheduled_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            scheduled_date: {
              ...where.scheduled_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.completion_dateRange) {
        const [start, end] = filter.completion_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            completion_date: {
              ...where.completion_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            completion_date: {
              ...where.completion_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.inspector) {
        const listItems = filter.inspector.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          inspectorId: { [Op.or]: listItems },
        };
      }

      if (filter.institute) {
        const listItems = filter.institute.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          instituteId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.inspections.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.inspections.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('inspections', 'scheduled_date', query),
        ],
      };
    }

    const records = await db.inspections.findAll({
      attributes: ['id', 'scheduled_date'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['scheduled_date', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.scheduled_date,
    }));
  }
};
