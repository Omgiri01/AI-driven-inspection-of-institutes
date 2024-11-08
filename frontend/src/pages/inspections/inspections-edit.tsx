import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

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
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/inspections/inspectionsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditInspectionsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    scheduled_date: new Date(),

    completion_date: new Date(),

    inspector: '',

    report: '',

    institute: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { inspections } = useAppSelector((state) => state.inspections);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof inspections === 'object') {
      setInitialValues(inspections);
    }
  }, [inspections]);

  useEffect(() => {
    if (typeof inspections === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = inspections[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [inspections]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/inspections/inspections-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit inspections')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit inspections'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='ScheduledDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.scheduled_date
                      ? new Date(
                          dayjs(initialValues.scheduled_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, scheduled_date: date })
                  }
                />
              </FormField>

              <FormField label='CompletionDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.completion_date
                      ? new Date(
                          dayjs(initialValues.completion_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({
                      ...initialValues,
                      completion_date: date,
                    })
                  }
                />
              </FormField>

              <FormField label='Inspector' labelFor='inspector'>
                <Field
                  name='inspector'
                  id='inspector'
                  component={SelectField}
                  options={initialValues.inspector}
                  itemRef={'users'}
                  showField={'firstName'}
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
                  options={initialValues.institute}
                  itemRef={'institutes'}
                  showField={'name'}
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

EditInspectionsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_INSPECTIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditInspectionsPage;
