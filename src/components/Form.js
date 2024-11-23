const Form = ({ initialValues, onSubmit, onReset, children, validate }) => {
  const { values, handleChange, handleSubmit, handleReset } = useForm(
    initialValues,
    onSubmit,
    onReset
  );

  const handleValidation = (name) => {
    const value = values[name];
    const fieldName = name.charAt(0).toUpperCase() + name.slice(1); // Capitalize field name
    return validate[name] ? validate[name](value, fieldName, values) : undefined;
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
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
