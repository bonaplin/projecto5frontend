import React from 'react';
import FormInput from './FormInput';


function LoginForm({ inputs, handleChange, handleSubmit }) {
  return (
    <form data-testid="login-form" onSubmit={handleSubmit}>
      <FormInput
        
        placeholder={"Enter your username"}
        type="text"
        name="username"
        value={inputs.username}
        onChange={handleChange}
      />
      <FormInput
        placeholder="Enter your password"
        type="password"
        name="password"
        value={inputs.password}
        onChange={handleChange}
      />
      <input type="submit" value="Login" />
    </form>
  );
}

export default LoginForm;