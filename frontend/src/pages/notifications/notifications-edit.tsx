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

import { update, fetch } from '../../stores/notifications/notificationsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditNotificationsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    message: '',

    sent_at: new Date(),

    user: '',

    institute: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { notifications } = useAppSelector((state) => state.notifications);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof notifications === 'object') {
      setInitialValues(notifications);
    }
  }, [notifications]);

  useEffect(() => {
    if (typeof notifications === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = notifications[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [notifications]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/notifications/notifications-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit notifications')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit notifications'}
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
              <FormField label='Message' hasTextareaHeight>
                <Field name='message' as='textarea' placeholder='Message' />
              </FormField>

              <FormField label='SentAt'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.sent_at
                      ? new Date(
                          dayjs(initialValues.sent_at).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, sent_at: date })
                  }
                />
              </FormField>

              <FormField label='User' labelFor='user'>
                <Field
                  name='user'
                  id='user'
                  component={SelectField}
                  options={initialValues.user}
                  itemRef={'users'}
                  showField={'firstName'}
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
                  onClick={() =>
                    router.push('/notifications/notifications-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditNotificationsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_NOTIFICATIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditNotificationsPage;
