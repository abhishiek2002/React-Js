import React, { useEffect, useState } from "react";
import InputBox from "./components/InputBox";
import SwapBtn from "./components/SwapBtn";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

// `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`

const currencyInfo = (currency) => {
  return fetch(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
  ).then((res) => res.json());
};

const App = () => {
  const [to, setTo] = useState("inr");
  const [from, setFrom] = useState("usd");
  const [currencyData, setCurrencyData] = useState({});
  let [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  useEffect(() => {
    setConvertedAmount(amount * currencyData[to]);
  }, [amount]);

  useEffect(() => {
    const fetchData = async (from) => {
      const data = await currencyInfo(from);
      setCurrencyData(data[from]);
    };
    fetchData(from);
  }, [from]);

  const options = Object.keys(currencyData);

  
  const swapCurrency = () => {
    setTo(from);
    setFrom(to);
    // let temp = amount;
    setAmount(convertedAmount);
    // setConvertedAmount(temp);
  };
  return (
    <>
      <div className="w-screen h-screen bg-[url(https://images.pexels.com/photos/618079/pexels-photo-618079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)] bg-center bg-no-repeat bg-cover flex justify-center items-center contrast-125 ">
        <div className="w-2xl max-h-96 backdrop-blur-xs text-black rounded-lg flex justify-center items-center flex-col shadow-2xl">
          <h1 className="text-lg text-center p-1 my-0.5">Currency Convertor</h1>

          <InputBox
            label="From"
            disabality={false}
            currencyOptions={options}
            selectedCurrency={from}
            amount={amount}
            onAmountChange={(num) => {
              setAmount(num);
            }}
            onCurrencyChange={(cur) => setFrom(cur)}
          />

          <SwapBtn swap={() => swapCurrency()} />

          <InputBox
            label="To"
            disabality={true}
            currencyOptions={options}
            selectedCurrency={to}
            amount={convertedAmount}
            onCurrencyChange={(cur) => setTo(cur)}
          />

          <button className="text-lg mx-auto px-4 block bg-blue-700 rounded-md cursor-pointer my-2 hover:brightness-90">
            Convert
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
