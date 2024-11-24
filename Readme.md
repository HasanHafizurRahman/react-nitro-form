# react-nitro-form

`react-nitro-form` is a lightweight React library for managing forms with built-in validation support. It simplifies form handling in React by providing a declarative way to manage state, validation, and submission.

---

## Features

- **Declarative Form Management:** Easily manage form state with the `useForm` hook .
- **Customizable Validation:** Includes common validators (e.g., required, minLength, maxLength, email) and allows custom validation rules.
- **Error Handling:** Passes validation errors to form fields for display.
- **Reset Functionality:** Provides reset handling for form values.
- **Easy Integration:** Works seamlessly with any React application.

---

## Installation

You can install react-nitro-form using npm or yarn:

```bash
npm install react-nitro-form
```

or

```bash
yarn add react-nitro-form
```

## Usage

### Basic Example

Here's a basic example of how to use react-nitro-form in your React application:

```jsx
import React from 'react';
import { useForm, required, minLength } from 'react-nitro-form';

const App = () => {
  const initialValues = { username: '', password: '' };

  const validate = {
    username: required, // Ensures username is not empty
    password: minLength(6), // Ensures password is at least 6 characters long
  };

  const { values, handleChange, handleSubmit, handleReset } = useForm(
    initialValues,
    (values) => alert('Form Submitted: ' + JSON.stringify(values)),
    () => alert('Form Reset')
  );

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
        />
        {validate.username(values.username) && (
          <p>{validate.username(values.username)}</p>
        )}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        {validate.password(values.password) && (
          <p>{validate.password(values.password)}</p>
        )}
      </div>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  );
};

export default App;
```
### Advanced Example
**Validation with Multiple Rules**
```jsx
import React, { useState } from 'react';
import { useForm, required, minLength, isEmail } from 'react-nitro-form';

const App = () => {
  // Initial values for the form
  const initialValues = { name: '', email: '', password: '' };
  const [submittedData, setSubmittedData] = useState(null);

  // Enhanced validation rules
  const validate = {
    name: required, // Ensures the name is not empty
    email: (value) => required(value) || isEmail(value), // Checks for both required and valid email
    password: (value) => required(value) || minLength(6)(value), // Ensures password is required and has minimum length
  };

  // Form submission handler
  const handleFormSubmit = (values) => {
    setSubmittedData(values); // Store the submitted data
  };

  // Initialize form hooks
  const { values, handleChange, handleSubmit, handleReset } = useForm(
    initialValues,
    handleFormSubmit
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">React Nitro Form Demo</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-1">
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
            {validate.name(values.name) && (
              <p className="text-red-500 text-sm">{validate.name(values.name)}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {validate.email(values.email) && (
              <p className="text-red-500 text-sm">{validate.email(values.email)}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {validate.password(values.password) && (
              <p className="text-red-500 text-sm">{validate.password(values.password)}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Display Submitted Data */}
        {submittedData && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
            <h2 className="text-lg font-semibold text-gray-600">Form Submission Result</h2>
            <pre className="mt-2 p-2 bg-gray-100 rounded-lg text-gray-800 overflow-x-auto">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
```

## Validators

**react-nitro-form** includes a set of built-in validators to handle common validation requirements. These validators are designed to be simple yet powerful, enabling you to ensure that form fields meet specific requirements.

---

#### How Validators Work

Validators are functions that check the value of a field and return an error message if the validation fails. When no error occurs, the validator returns `undefined`. Each validator can be assigned to a form field in the `validate` object, which maps field names to their corresponding validation functions.

Validators also support **customizable field names**. If a `fieldName` is not provided, the default value is used.

---

### Built-in Validators

Here’s a list of the built-in validators and their usage:

#### `required`

Ensures the field is not empty.

- **Arguments:**
  - `value`: The value of the field.
  - `fieldName` (optional): The name of the field (default: `"This field"`).

```jsx
import { required } from 'react-nitro-form';

const validate = {
  username: required,
};
```

If `username` is empty, an error message like `"Username is required"` will be displayed.

---

#### `minLength`

Ensures the value has at least the specified number of characters.

- **Arguments:**
  - `min`: The minimum length.
  - `value`: The value of the field.
  - `fieldName` (optional): The name of the field (default: `"This field"`).

```jsx
import { minLength } from 'react-nitro-form';

const validate = {
  password: minLength(8),
};
```

If `password` is shorter than 8 characters, an error message like `"Password must be at least 8 characters long"` will be displayed.

---

#### `maxLength`

Ensures the value does not exceed the specified number of characters.

- **Arguments:**
  - `max`: The maximum length.
  - `value`: The value of the field.
  - `fieldName` (optional): The name of the field (default: `"This field"`).

```jsx
import { maxLength } from 'react-nitro-form';

const validate = {
  username: maxLength(15),
};
```

If `username` exceeds 15 characters, an error message like `"Username must not exceed 15 characters"` will be displayed.

---

#### `isEmail`

Ensures the value is a valid email address.

- **Arguments:**
  - `value`: The value of the field.
  - `fieldName` (optional): The name of the field (default: `"Email"`).

```jsx
import { isEmail } from 'react-nitro-form';

const validate = {
  email: isEmail,
};
```

If `email` is not a valid email address, an error message like `"Email must be a valid email address"` will be displayed.

---

#### `match`

Ensures the value matches another field's value.

- **Arguments:**
  - `matchField`: The name of the field to match.
  - `value`: The value of the field.
  - `values`: The full set of form values.
  - `fieldName` (optional): The name of the field (default: `"This field"`).

```jsx
import { match } from 'react-nitro-form';

const validate = {
  confirmPassword: match('password'),
};
```

If `confirmPassword` does not match `password`, an error message like `"ConfirmPassword must match password"` will be displayed.

---

#### `customValidator`

Enables custom validation logic.

- **Arguments:**
  - `callback`: A function that returns `true` if the value is valid or `false` otherwise.
  - `errorMessage`: The custom error message to display.
  - `value`: The value of the field.
  - `fieldName`: The name of the field.

```jsx
import { customValidator } from 'react-nitro-form';

const isEven = (num) => num % 2 === 0;

const validate = {
  number: customValidator(isEven, 'The number must be even'),
};
```

If `number` is not even, an error message like `"The number must be even"` will be displayed.

## Development

To build the project, you can use the following command:

```bash
npm run build
```

This will use Rollup to bundle the project.

## Contributing

If you'd like to contribute to react-nitro-form, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

react-nitro-form is released under the MIT license. See `LICENSE` for more information.

## Author

Hasan Hafizur Rahman
```
