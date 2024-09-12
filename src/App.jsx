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
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
import { FavoritesProvider } from "./context/FavoritesContext";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import EditPostPage from "./routes/editPostPage";

function App() {
  const { currentUser } = useContext(AuthContext);

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
          element: <ProfilePage />,
          loader: profilePageLoader
        },
        {
          path: "/perfil/atualizar",
          element: <ProfileUpdatePage />
        },
        {
          path: "/publicar",
          element: <NewPostPage />
        },
        {
          path: "/atualizar/:id",
          element: <EditPostPage />
        }
      ]
    }
  ]);
  
  return (
    <FavoritesProvider userId={currentUser?.id}>
      <RouterProvider router={router}/>
    </FavoritesProvider>
  )
}

export default App