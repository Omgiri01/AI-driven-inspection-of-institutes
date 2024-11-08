import React from 'react';
import ImageField from '../ImageField';
import ListActionsPopover from '../ListActionsPopover';
import { useAppSelector } from '../../stores/hooks';
import dataFormatter from '../../helpers/dataFormatter';
import { Pagination } from '../Pagination';
import { saveFile } from '../../helpers/fileSaver';
import LoadingSpinner from '../LoadingSpinner';

import { hasPermission } from '../../helpers/userPermissions';

type Props = {
  inspections: any[];
  loading: boolean;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
};

const CardUsers = ({
  inspections,
  loading,
  onEdit,
  onView,
  onDelete,
  currentPage,
  numPages,
  onPageChange,
}: Props) => {
  const asideScrollbarsStyle = useAppSelector(
    (state) => state.style.asideScrollbarsStyle,
  );
  const bgColor = useAppSelector((state) => state.style.cardsColor);
  const darkMode = useAppSelector((state) => state.style.darkMode);
  const corners = useAppSelector((state) => state.style.corners);
  const focusRing = useAppSelector((state) => state.style.focusRingColor);

  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const hasUpdatePermission = hasPermission(currentUser, 'UPDATE_INSPECTIONS');

  return (
    <div className={'p-4'}>
      {loading && <LoadingSpinner />}
      <ul
        role='list'
        className='grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 2xl:grid-cols-4 xl:gap-x-8'
      >
        {!loading &&
          inspections.map((item, index) => (
            <li
              key={item.id}
              className={`overflow-hidden ${
                corners !== 'rounded-full' ? corners : 'rounded-3xl'
              } border  ${focusRing} border-gray-200 dark:border-dark-700 ${
                darkMode ? 'aside-scrollbars-[slate]' : asideScrollbarsStyle
              }`}
            >
              <div
                className={`flex items-center ${bgColor} p-6  gap-x-4 border-b border-gray-900/5 bg-gray-50 dark:bg-dark-800 relative`}
              >
                <button
                  className='text-lg font-bold leading-6 line-clamp-1'
                  onClick={() => onView(item.id)}
                >
                  {item.scheduled_date}
                </button>

                <div className='ml-auto '>
                  <ListActionsPopover
                    onDelete={onDelete}
                    onView={onView}
                    onEdit={onEdit}
                    itemId={item.id}
                    pathEdit={`/inspections/inspections-edit/?id=${item.id}`}
                    pathView={`/inspections/inspections-view/?id=${item.id}`}
                    hasUpdatePermission={hasUpdatePermission}
                  />
                </div>
              </div>
              <dl className='divide-y  divide-stone-300   dark:divide-dark-700 px-6 py-4 text-sm leading-6 h-64 overflow-y-auto'>
                <div className='flex justify-between gap-x-4 py-3'>
                  <dt className='  text-gray-500  dark:text-dark-600'>
                    ScheduledDate
                  </dt>
                  <dd className='flex items-start gap-x-2'>
                    <div className='font-medium line-clamp-4'>
                      {dataFormatter.dateTimeFormatter(item.scheduled_date)}
                    </div>
                  </dd>
                </div>

                <div className='flex justify-between gap-x-4 py-3'>
                  <dt className='  text-gray-500  dark:text-dark-600'>
                    CompletionDate
                  </dt>
                  <dd className='flex items-start gap-x-2'>
                    <div className='font-medium line-clamp-4'>
                      {dataFormatter.dateTimeFormatter(item.completion_date)}
                    </div>
                  </dd>
                </div>

                <div className='flex justify-between gap-x-4 py-3'>
                  <dt className='  text-gray-500  dark:text-dark-600'>
                    Inspector
                  </dt>
                  <dd className='flex items-start gap-x-2'>
                    <div className='font-medium line-clamp-4'>
                      {dataFormatter.usersOneListFormatter(item.inspector)}
                    </div>
                  </dd>
                </div>

                <div className='flex justify-between gap-x-4 py-3'>
                  <dt className='  text-gray-500  dark:text-dark-600'>
                    Report
                  </dt>
                  <dd className='flex items-start gap-x-2'>
                    <div className='font-medium line-clamp-4'>
                      {item.report}
                    </div>
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        {!loading && inspections.length === 0 && (
          <div className='col-span-full flex items-center justify-center h-40'>
            <p className=''>No data to display</p>
          </div>
        )}
      </ul>
      <div className={'flex items-center justify-center my-6'}>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          setCurrentPage={onPageChange}
        />
      </div>
    </div>
  );
};

export default CardUsers;
