import React from "react";

const useCurrencyInfo = (currency) => {
  let data = {};
  fetch(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
  )
    .then((res) => res.json())
    .then((res) => (data = res.currency));

  return data;
};

export default useCurrencyInfo;
