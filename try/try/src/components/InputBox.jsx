import React from "react";

const InputBox = ({
  label,
  disabality = false,
  currencyOptions = [],
  selectedCurrency='usd',
  amount=0,
  onAmountChange,
  onCurrencyChange
  
}) => {

  return (
    <>
      <div className="flex justify-between bg-amber-100 rounded-lg p-1 mx-4 my-2">
        <div className="flex flex-col">
          <label htmlFor={label} className="text-gray-600 cursor-pointer">
            {label}
          </label>

          <input
            type="number"
            id={label}
            className="w-lg cursor-pointer outline-0"
            placeholder="Amount"
            disabled={disabality}
            value={amount}
            onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
          />
        </div>


        <div className="flex flex-col justify-center items-end">
          <p className="text-gray-600">Currency Type</p>

          <select
            className="outline-0 bg-gray-300 rounded-md my-2 px-0.5"
            value={selectedCurrency}
            onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
            
          >
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
           
          </select>
        </div>
      </div>
    </>
  );
};

export default InputBox;
