import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/institutes/institutesSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

import { hasPermission } from '../../helpers/userPermissions';

const InstitutesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { institutes } = useAppSelector((state) => state.institutes);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View institutes')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View institutes')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{institutes?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Users Institutes</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {institutes.users_institute &&
                      Array.isArray(institutes.users_institute) &&
                      institutes.users_institute.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!institutes?.users_institute?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Inspections institute</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>ScheduledDate</th>

                      <th>CompletionDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {institutes.inspections_institute &&
                      Array.isArray(institutes.inspections_institute) &&
                      institutes.inspections_institute.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/inspections/inspections-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='scheduled_date'>
                            {dataFormatter.dateTimeFormatter(
                              item.scheduled_date,
                            )}
                          </td>

                          <td data-label='completion_date'>
                            {dataFormatter.dateTimeFormatter(
                              item.completion_date,
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!institutes?.inspections_institute?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Notifications institute</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Message</th>

                      <th>SentAt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {institutes.notifications_institute &&
                      Array.isArray(institutes.notifications_institute) &&
                      institutes.notifications_institute.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/notifications/notifications-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='message'>{item.message}</td>

                          <td data-label='sent_at'>
                            {dataFormatter.dateTimeFormatter(item.sent_at)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!institutes?.notifications_institute?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/institutes/institutes-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

InstitutesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_INSTITUTES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default InstitutesView;
