import HomePage from "./routes/homePage"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ListPage from "./routes/listPage"
import Layout from "./routes/layout";
import SinglePage from "./routes/singlePage";
import LoginPage from "./routes/loginPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/listagem",
          element: <ListPage />
        },
        {
          path: "/:id",
          element: <SinglePage />
        },
        {
          path: "/entrar",
          element: <LoginPage />
        }
      ]
    }
  ]);
  
  return (
      <RouterProvider router={router}/>
  )
}

export default App