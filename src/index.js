import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import ListCategories from './components/listCategories/ListCategories';
import AddCategory from './components/AddCategory/AddCategory';
import AddBook from './components/AddBook/AddBook';
import ListBooks from './components/listBooks/ListBooks';
import AddBookToCategory from './components/AddBookToCategory/AddBookToCategory';
import ViewCategory from './components/ViewCategory/ViewCategory';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "categories",
        element: <ListCategories/>
      },
      {
        path: "books",
        element: <ListBooks />
      },
      {
        path: "addCategory",
        element:<AddCategory/>
      },
      {
        path: "addBook",
        element:<AddBook/>
      },
      {
        path: "addBookToCategory",
        element: <AddBookToCategory />
      },
      {
        path: "viewCategory",
        element: <ViewCategory />
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
