<h1 align="center">Redux Toolkit</h1>

## Install Redux Toolkit and React-Redux
`Add the Redux Toolkit and React-Redux packages to your project:`

```js
npm install @reduxjs/toolkit react-redux
```

## Create a Redux Store

Create a file named `src/app/store.js`. Import the `configureStore` API from `Redux Toolkit`. We'll start by creating an empty Redux store, and exporting it:

```js
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {}
});
```
`This creates a Redux store, and also automatically configure the Redux DevTools extension so that you can inspect the store while developing.`

## Provide the Redux Store to React

Once the store is created, we can make it available to our React components by putting a React-Redux `<Provider>` around our application in` src/main.js`. Import the Redux store we just created, put a` <Provider>` around your `<App>`, and pass the `store` as a `prop`:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import { store } from './app/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
```

## Create a Redux State Slice

Add a new file named `src/features/Todo/todoSlice.js`. In that file, import the `createSlice` API from `Redux Toolkit`.

### Creating a slice requires:-

1. string name - `To identify the slice`
2. initial state value
3. one or more reducer functions - `To define how the state can be updated`

### Once a slice created:- 

we can export:-

```md
1. Generated Redux action creators
2. And the reducer functions
```


Redux requires that we write all state updates immutably, by making copies of data and updating the copies. However, Redux Toolkit's createSlice and createReducer APIs use Immer inside to allow us to write "mutating" update logic that becomes correct immutable updates.

```js
import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    todos: [
      // {
      //   id: nanoid(),
      //   text: "Hello",
      //   completed: false,
      // },
    ],
  },
  reducers: {
    addTodo: (state, action) => {
      const todo = { id: nanoid(), text: action.payload, completed: false };
      state.todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.value }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    toggleComplete: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    initialLocalTodos: (state, action) => {
      console.log(state.todos);
      // console.log(action.payload);
      state.todos = action.payload;
    },
  },
});

// exporting actions

export const {
  addTodo,
  updateTodo,
  toggleComplete,
  deleteTodo,
  initialLocalTodos,
} = todoSlice.actions;

// exporting reducers

export default todoSlice.reducer;

```

## Add Slice Reducers to the Store

Next, we need to import the reducer function from the counter slice and add it to our store. By defining a field inside the reducer parameter, we tell the store to use this slice reducer function to handle all updates to that state.

```js
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/Todo/todoSlice";

export const store = configureStore({
    reducer: {
        todo: todoReducer,
    }
});
```
## Use Redux State and Actions in React Components

Now we can use the `React-Redux hooks` to let React components interact with the `Redux store`. We can `read data` from the store with `useSelector`, and `dispatch actions` using `useDispatch`.Import the components, Hooks or neccessary items into App.js and render it inside of <App>.

```jsx
import { useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { initialLocalTodos } from "./features/Todo/todoSlice";

function App() {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    dispatch(initialLocalTodos(JSON.parse(localStorage.getItem("todos"))));
  }, []);

  return (
    <div className="bg-[#172842] min-h-screen flex justify-center">
      <div className="bg-[#172842] h-max w-9/10 max-w-[600px] flex flex-col gap-2 p-1.5 items-start shadow-2xl shadow-black rounded-lg mt-2">
        <div className="flex flex-col justify-center gap-4 w-full p-1.5">
          <h1 className="text-white text-2xl text-center">Manage Your Todos</h1>
          {/* TodoForm */}
          <TodoForm />
        </div>

        <div className="p-1.5 flex flex-col gap-2">
          {/* TodoList */}
          {todos &&
            todos.map((todo) => (
              <div key={todo.id}>
                <TodoList todo={todo} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;

```

```md
The corresponding Redux action will be dispatched to the store
The counter slice reducer will see the actions and update its state
```

# What we have learned

## Summary

```md
# Create a Redux store with configureStore
    1. configureStore accepts a reducer function as a named argument
    2. configureStore automatically sets up the store with good default settings
# Provide the Redux store to the React application components
    1. Put a React-Redux <Provider> component around your <App />
    2. Pass the Redux store as <Provider store={store}>
# Create a Redux "slice" reducer with createSlice
    1. Call createSlice with a string name, an initial state, and named reducer functions
    2. Reducer functions may "mutate" the state using Immer
    3. Export the generated slice reducer and action creators
# Use the React-Redux useSelector/useDispatch hooks in React components
    1. Read data from the store with the useSelector hook
    2. Get the dispatch function with the useDispatch hook, and dispatch actions as needed
```