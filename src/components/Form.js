// src/components/Form.js
import React from 'react';
import useForm from '../hooks/useForm';

const Form = ({ initialValues, onSubmit, children }) => {
  const { values, handleChange, handleSubmit } = useForm(initialValues, onSubmit);

  return (
    <form onSubmit={handleSubmit}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.props.name) {
          return React.cloneElement(child, {
            value: values[child.props.name] || '',
            onChange: handleChange
          });
        }
        return child;
      })}
    </form>
  );
};

export default Form;
