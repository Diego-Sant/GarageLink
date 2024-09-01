import { createBrowserRouter, RouterProvider } from "react-router-dom"

import HomePage from "./routes/homePage"
import ListPage from "./routes/listPage"
import Layout from "./routes/layout";
import SinglePage from "./routes/singlePage";
import LoginPage from "./routes/loginPage";
import ProfilePage from "./routes/profilePage";

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
          path: "/carros",
          element: <ListPage />
        },
        {
          path: "/carros/:id",
          element: <SinglePage />
        },
        {
          path: "/entrar",
          element: <LoginPage />
        },
        {
          path: "/perfil",
          element: <ProfilePage />
        }
      ]
    }
  ]);
  
  return (
      <RouterProvider router={router}/>
  )
}

export default App