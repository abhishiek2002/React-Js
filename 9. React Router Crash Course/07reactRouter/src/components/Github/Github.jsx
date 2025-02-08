import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

function Github() {
  const data = useLoaderData();
  //   const [data, setData] = useState({});
  //   useEffect(() => {
  //     fetch("https://api.github.com/users/abhishiek2002")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setData(data);
  //       });
  //   }, []);

  return (
    <div className="text-center bg-gray-600 text-white p-4 text-3xl">
      Github Followers: {data.followers}
      <img src={data.avatar_url} alt="Git picture" width={300} />
    </div>
  );
}

export default Github;

// this function use by loader in main.jsx file and loader generally fetch data / call this function on time when we just hover cursor on element where we link this element. Here, we link this element with Header elements "Github" link tag

export const githubInfoLoader = async () => {
  const response = await fetch("https://api.github.com/users/abhishiek2002");
  return response.json();
};
