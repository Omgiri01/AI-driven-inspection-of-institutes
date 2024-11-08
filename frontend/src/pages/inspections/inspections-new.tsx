import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/inspections/inspectionsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  scheduled_date: '',

  completion_date: '',

  inspector: '',

  report: '',

  institute: '',
};

const InspectionsNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // get from url params
  const { dateRangeStart, dateRangeEnd } = router.query;

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/inspections/inspections-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
              dateRangeStart && dateRangeEnd
                ? {
                    ...initialValues,
                    scheduled_date:
                      moment(dateRangeStart).format('YYYY-MM-DDTHH:mm'),
                    completion_date:
                      moment(dateRangeEnd).format('YYYY-MM-DDTHH:mm'),
                  }
                : initialValues
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='ScheduledDate'>
                <Field
                  type='datetime-local'
                  name='scheduled_date'
                  placeholder='ScheduledDate'
                />
              </FormField>

              <FormField label='CompletionDate'>
                <Field
                  type='datetime-local'
                  name='completion_date'
                  placeholder='CompletionDate'
                />
              </FormField>

              <FormField label='Inspector' labelFor='inspector'>
                <Field
                  name='inspector'
                  id='inspector'
                  component={SelectField}
                  options={[]}
                  itemRef={'users'}
                ></Field>
              </FormField>

              <FormField label='Report' hasTextareaHeight>
                <Field
                  name='report'
                  id='report'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='institute' labelFor='institute'>
                <Field
                  name='institute'
                  id='institute'
                  component={SelectField}
                  options={[]}
                  itemRef={'institutes'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/inspections/inspections-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

InspectionsNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_INSPECTIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default InspectionsNew;
