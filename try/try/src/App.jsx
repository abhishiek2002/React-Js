import React, { useEffect, useState } from "react";
import InputBox from "./components/InputBox";
import SwapBtn from "./components/SwapBtn";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

const App = () => {
  const [amount, setAmount] = useState(0);
  const [to, setTo] = useState("inr");
  const [from, setFrom] = useState("usd");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swapCurrency = () => {
    setTo(from);
    setFrom(to);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <>
      <div className="w-screen h-screen bg-[url(https://images.pexels.com/photos/618079/pexels-photo-618079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)] bg-center bg-no-repeat bg-cover flex justify-center items-center contrast-125 ">
        <div className="w-2xl max-h-96 backdrop-blur-xs text-black rounded-lg flex justify-center items-center flex-col shadow-2xl">
          <h1 className="text-lg text-center p-1 my-0.5">Currency Convertor</h1>

          <InputBox
            label="From"
            disabality={false}
            amount={amount}
            options={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            selectCurrency={from}
            onAmountChange={(amount) => setAmount(amount)}
          />

          <SwapBtn swap={() => swapCurrency()} />

          <InputBox
            label="To"
            disabality={true}
            amount={convertedAmount}
            options={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectCurrency={to}
          />

          <button
            onClick={convert}
            className="text-lg mx-auto px-4 block bg-blue-700 rounded-md cursor-pointer my-2 hover:brightness-90"
          >
            Convert {from.toUpperCase()} To {to.toUpperCase()}
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
