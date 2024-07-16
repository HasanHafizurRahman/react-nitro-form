import React from 'react';
import useForm from '../hooks/useForm';

const Form = ({ initialValues, onSubmit, children, validate }) => {
  const { values, handleChange, handleSubmit } = useForm(initialValues, onSubmit);

  const handleValidation = (name) => {
    const value = values[name];
    return validate[name] ? validate[name](value) : undefined;
  };

  return (
    <form onSubmit={handleSubmit}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.props.name) {
          const error = handleValidation(child.props.name);
          return React.cloneElement(child, {
            value: values[child.props.name] || '',
            onChange: handleChange,
            error,
          });
        }
        return child;
      })}
    </form>
  );
};

export default Form;
