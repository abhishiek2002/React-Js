import React, { useState } from "react";
import Input from "./components/input";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

const App = () => {
  const [currency, setCurrency] = useState("usd");

  const currencyDetail = useCurrencyInfo(currency);
  const options = Object.keys(currencyDetail);
  console.log(currencyDetail);
  
  return (
    <div className="w-screen bg-[url(https://images.pexels.com/photos/618079/pexels-photo-618079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)] bg-no-repeat bg-center bg-cover h-screen m-auto flex justify-center items-center text-black">

      <div className="w-md backdrop-blur-sm">
        <Input label="From" currencyOptions={options}/>
      </div>
    </div>
  );
};

export default App;
