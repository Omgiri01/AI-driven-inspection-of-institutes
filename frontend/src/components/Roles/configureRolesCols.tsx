import React from 'react';
import BaseIcon from '../BaseIcon';
import { mdiEye, mdiTrashCan, mdiPencilOutline } from '@mdi/js';
import axios from 'axios';
import {
  GridActionsCellItem,
  GridRowParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import ImageField from '../ImageField';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import DataGridMultiSelect from '../DataGridMultiSelect';
import ListActionsPopover from '../ListActionsPopover';

import { hasPermission } from '../../helpers/userPermissions';

type Params = (id: string) => void;

export const loadColumns = async (
  onDelete: Params,
  onView: Params,
  onEdit: Params,
  entityName: string,

  user,
) => {
  async function callOptionsApi(entityName: string) {
    if (!hasPermission(user, 'READ_' + entityName.toUpperCase())) return [];

    try {
      const data = await axios(`/${entityName}/autocomplete?limit=100`);
      return data.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const hasUpdatePermission = hasPermission(user, 'UPDATE_ROLES');

  return [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: hasUpdatePermission,
    },

    {
      field: 'permissions',
      headerName: 'Permissions',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: false,
      sortable: false,
      type: 'singleSelect',
      valueFormatter: ({ value }) =>
        dataFormatter.permissionsManyListFormatter(value).join(', '),
      renderEditCell: (params) => (
        <DataGridMultiSelect {...params} entityName={'permissions'} />
      ),
    },

    {
      field: 'globalAccess',
      headerName: 'Global Access',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: hasUpdatePermission,

      type: 'boolean',
    },

    {
      field: 'actions',
      type: 'actions',
      minWidth: 30,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      getActions: (params: GridRowParams) => {
        return [
          <ListActionsPopover
            onDelete={onDelete}
            onView={onView}
            onEdit={onEdit}
            itemId={params?.row?.id}
            pathEdit={`/roles/roles-edit/?id=${params?.row?.id}`}
            pathView={`/roles/roles-view/?id=${params?.row?.id}`}
            key={1}
            hasUpdatePermission={hasUpdatePermission}
          />,
        ];
      },
    },
  ];
};
