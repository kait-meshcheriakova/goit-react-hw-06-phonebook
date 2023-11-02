import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  StyledForm,
  StyledField,
  ErrorMsg,
  InputContainer,
  ButtonForm,
  Text,
} from './ContactForm.styled';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/contactsSlice';

const formSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Only letters are allowed')
    .min(3, 'Too Short!')
    .required('This field is required, please fill that'),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, 'Must be in format: 000-00-00')
    .required('This field is required, please fill that'),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={formSchema}
      onSubmit={(values, action) => {
        dispatch(addContact({ values }));
        action.resetForm();
      }}
    >
      <StyledForm>
        <InputContainer>
          <Text>Name</Text>
          <StyledField type="text" name="name" />

          <ErrorMsg name="name" component="div" />
        </InputContainer>
        <InputContainer>
          <Text>Number</Text>
          <StyledField type="tel" name="number" />

          <ErrorMsg name="number" component="div" />
        </InputContainer>

        <ButtonForm type="submit">Add contact</ButtonForm>
      </StyledForm>
    </Formik>
  );
};

export default ContactForm;
