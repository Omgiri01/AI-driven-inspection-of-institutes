import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/inspections/inspectionsSlice';
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

const InspectionsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { inspections } = useAppSelector((state) => state.inspections);

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
        <title>{getPageTitle('View inspections')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View inspections')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <FormField label='ScheduledDate'>
            {inspections.scheduled_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  inspections.scheduled_date
                    ? new Date(
                        dayjs(inspections.scheduled_date).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No ScheduledDate</p>
            )}
          </FormField>

          <FormField label='CompletionDate'>
            {inspections.completion_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  inspections.completion_date
                    ? new Date(
                        dayjs(inspections.completion_date).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No CompletionDate</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Inspector</p>

            <p>{inspections?.inspector?.firstName ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Report</p>
            {inspections.report ? (
              <p dangerouslySetInnerHTML={{ __html: inspections.report }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>institute</p>

            <p>{inspections?.institute?.name ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/inspections/inspections-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

InspectionsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_INSPECTIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default InspectionsView;
