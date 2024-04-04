import React from "react";
import FormInput from "./FormInput";

function ResetFormInput({ inputs, handleChange, handlePasswordReset }) {
  return (
    <form onSubmit={handlePasswordReset}>
      <FormInput
        placeholder="Enter your email"
        type="email"
        name="email"
        value={inputs.email}
        onChange={handleChange}
      />
      <input type="submit" value="Reset Password" />
    </form>
  );
}

export default ResetFormInput;