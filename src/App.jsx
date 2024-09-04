import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Layout, RequireAuth } from "./routes/layout";
import HomePage from "./routes/homePage"
import ListPage from "./routes/listPage"
import SinglePage from "./routes/singlePage";
import LoginPage from "./routes/loginPage";
import ProfilePage from "./routes/profilePage";
import RegisterPage from "./routes/registerPage";
import ProfileUpdatePage from "./routes/profileUpdatePage";

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
          path: "/cadastrar",
          element: <RegisterPage />
        },

      ]
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/perfil",
          element: <ProfilePage />
        },
        {
          path: "/perfil/atualizar",
          element: <ProfileUpdatePage />
        }
      ]
    }
  ]);
  
  return (
      <RouterProvider router={router}/>
  )
}

export default App