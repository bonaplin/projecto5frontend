import React from "react";
import FormInput from "./FormInput";

function ConfirmUser({ inputs, handleChange, handlePasswordReset }) {
    return (
        <form onSubmit={handlePasswordReset}>
        <FormInput
            placeholder="Enter your new password"
            type="password"
            name="password"
            value={inputs.newPassword}
            onChange={handleChange}
        />
        <FormInput
            placeholder="Confirm your new password"
            type="password"
            name="passwordAgain"
            value={inputs.newPasswordAgain}
            onChange={handleChange}
        />
        <input type="submit" value="Set new password" />
        </form>
    );
    }
    export default ConfirmUser;