import { useState } from 'react';

const useForm = (initialValues, onSubmit, onReset) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  const handleReset = () => {
    setValues(initialValues);
    if (onReset) onReset();
  };

  return {
    values,
    handleChange,
    handleSubmit,
    handleReset,
  };
};

export default useForm;
