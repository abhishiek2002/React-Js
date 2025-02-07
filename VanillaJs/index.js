// let data = {};

const obj = {
  name: "Abhishek",
  age: 22,
  sub: "CSE",
};

// function detail() {
//   fetch(
//     `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`
//   )
//     .then((res) => res.json());
// }

async function detail() {
    const res = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`);
    if (!res) throw(Error(res.statusText))
    const data = await res.json();
    // console.log(data);
    return data;
}

const data = detail();

// data = detail();
console.log(data);

console.log(obj.name);
