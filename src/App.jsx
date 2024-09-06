import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Layout, RequireAuth } from "./routes/layout";
import HomePage from "./routes/homePage"
import ListPage from "./routes/listPage"
import SinglePage from "./routes/singlePage";
import LoginPage from "./routes/loginPage";
import ProfilePage from "./routes/profilePage";
import RegisterPage from "./routes/registerPage";
import ProfileUpdatePage from "./routes/profileUpdatePage";
import NewPostPage from "./routes/newPostPage";
import { listPageLoader, singlePageLoader } from "./lib/loaders";

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
          element: <ListPage />,
          loader: listPageLoader
        },
        {
          path: "/carros/:id",
          element: <SinglePage />,
          loader: singlePageLoader
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
        },
        {
          path: "/publicar",
          element: <NewPostPage />
        }
      ]
    }
  ]);
  
  return (
      <RouterProvider router={router}/>
  )
}

export default App