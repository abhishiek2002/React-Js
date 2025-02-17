import { useState } from "react";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import "./App.css";
// import Spline from "@splinetool/react-spline";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Spline scene="https://prod.spline.design/eJTI9nHcj5Nm1efX/scene.splinecode" /> */}
      <h1 className="inset-0">Todo Using Redux Toolkit</h1>
      <AddTodo />
      <Todos />
    </>
  );
}

export default App;
