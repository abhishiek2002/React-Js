# What we have study in this 

## Create Some Components

```md
1. Home
2. About
3. Contact
4. Github
5. Footer
6. User
```

we have already studied to how create components in `React.js`. We have no problem in this.


## New Things That We have Learn In This Are

### Create Layout For Our Website

For creating `Layout` , we use `Outlet` from `react-router-dom`

```js
import { Outlet } from 'react-router-dom'
```

In `react-router-dom`, `<Outlet />` is a component used to render nested routes. It acts as a placeholder where child routes will be injected inside a parent route component.

#### When to Use `<Outlet />`
When you have nested routes and want to display child components inside a parent layout.
Useful for layouts with shared UI (like navigation bars or sidebars) where different child routes render inside a common structure. 

```jsx
import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
```

So above here, at the place of `<Outlet />` we can substitute any component we want, but `<Header />` and `<Footer />` components are fix with respect to the position with `<Outlet />`.

### Nesting

After creating `Layout` , we did nesting.

For nesting , we need router

#### Import `RouterProvider`

```js
 import { RouterProvider } from 'react-router-dom'
 ```

 It take an `prop` that is `router` (Isko bas ek router bnake dedo)

 ```jsx
 <RouterProvider router={router} />
 ```
 Way to use in `main.jsx` after importing

 ```jsx
 createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
 ```

 #### Create `Router`

 For creating router ,we use `createBrowserRouter`

 ```js
 import { createBrowserRouter } from 'react-router-dom'
 ``` 

 After importing, we can create router

 There are two ways for it.

 1. 

 ```js
 const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      }, 
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'user/:id',
        element: <User />
      }
    ]
  }
])
 ```

2. 

```js
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >

      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='github' element={<Github />} />
      <Route path='user/:id' element={<User />}>

    </Route>
  )
)
```

### Dynamic Value From `url`

We studied, how to take dynamic values from `url` using `params`

#### First Create A Component Called `User`

```jsx
import React from 'react'
const User = () => {

  return (
    <div className='bg-gray-600 text-white text-center text-3xl p-2'>
      User : 
    </div>
  )
}

export default User
```

#### Define its dynamic route in nesting or in router

```js
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      }, 
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        loader: githubInfoLoader,
        path: 'github',
        element: <Github />
      },
    //   This is dynamic route 
      {
        path: 'user/:id',
        element: <User />
      }
    ]
  }
])
```

#### Now how to use params in the components

For this we use a `Hook` that is `useParams()`

import

```js
import { useParams } from 'react-router'
```

using `useParams()` in `User` Component

`useParam()` hook gives the params that are used in `url` to the component.

Because we use `id` param in url nesting, so we can use it only.

```jsx
import React from 'react'
import { useParams } from 'react-router'

const User = () => {
    const {id} = useParams();

  return (
    <div className='bg-gray-600 text-white text-center text-3xl p-2'>
      User : {id}
    </div>
  )
}

export default User
```


### How to optimize things where API is needed to call

#### Using `Loader`
```md
1. It fetches data before rendering a route.
2. It makes route-based data fetching declarative.
3. Works with useLoaderData() to access the fetched data in a component.
4. Prevents unnecessary re-renders by loading data before the component mounts.
```

So in router , we can use `loader` 

```js
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      }, 
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      },

    //   Here we use loader in this child component
      {
        loader: githubInfoLoader,
        path: 'github',
        element: <Github />
      },
      {
        path: 'user/:id',
        element: <User />
      }
    ]
  }
])
```

We can direct create function here or we can assign a function to loader and define it somewhere else

In this we define this `githubInfoLoader()` function inside the `Github.jsx` component (this is not appropriate way to define function at such place , we can define function in other files seperately)

```jsx
import React, { useEffect, useState } from "react";

function Github() {
    
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
    const response = await fetch('https://api.github.com/users/abhishiek2002')
    return response.json()
}
```


#### Getting Loader Data In Component

But here problem is that after applying loader in router, how to get loader data in the Component

Right, we use here an another `hook` called `useLoaderData()`

```js
import { useloaderData } from 'react-router-dom'
```

Way to use it in component is :-

```jsx
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

function Github() {


 //////////   // Here We use this hook
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
    const response = await fetch('https://api.github.com/users/abhishiek2002')
    return response.json()
}

```

