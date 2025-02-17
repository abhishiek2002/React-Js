import React, { useEffect, useState } from "react";
import { useUpdateTodosContext } from "../contexts/UpdateTodosContexts";

const TodoList = ({ setTodos }) => {
  const [isEditable, setIsEditable] = useState(false);
  const todos = useUpdateTodosContext();

//   const toggleCompleted = () => {
//     setTodos((prev) =>
//       prev.map((prevTodo) =>
//         prevTodo.id === todo.id
//           ? { ...prevTodo, completed: !prevTodo.completed }
//           : prevTodo
//       )
//     );
//   };

const toggleCompleted = (id) => {
    setTodos((prev) => (
        prev.map((prevTodo) => (
            prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo
        ))
    ))
}



    const todoEdit = (value, id) => {
      setTodos((prev) =>
        prev.map((prevTodo) =>
          prevTodo.id === id ? { ...prevTodo, todo: value } : prevTodo
        )
      );
    };

    const deleteTodo = (id) => {
      setTodos((prev) => (
        prev.filter((prevTodo) => prevTodo.id !== id)
      ))
    }

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <div
          className={`flex gap-1.5 max-w-max rounded-lg p-1.5 justify-around shadow-white/90 shadow ${
            todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
          }`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => {toggleCompleted(todo.id)}}
          />
          <input
            type="text"
            className={`w-3/5 h-max p-1.5 rounded-lg ${
              isEditable ? "outline-1" : "outline-none"
            } ${todo.completed ? "line-through" : ""}`}
            value={todo.todo}
            readOnly={!isEditable}
            onChange={(e) => todoEdit(e.target.value, todo.id)}
          />
          <button
            className="bg-white p-1.5 rounded-lg"
            onClick={() => setIsEditable((prev) => !prev)}
          >
            {isEditable ? "📁" : "✏️"}
          </button>
          <button onClick={() => {deleteTodo(todo.id)}} className="bg-white p-1.5 rounded-lg">
            ❌
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
