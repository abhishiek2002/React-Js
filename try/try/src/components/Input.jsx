import React from "react";

const Input = ({ label, currencyOptions }) => {
  return (
    <>
      <label htmlFor="">{label}</label>
      <input type="text" id={label}  />
      <select >
        {currencyOptions.map((currency) => {
            <option value="currency">
                {currency}
            </option>
        }
        )}

      </select>
    </>
  );
};

export default Input;
