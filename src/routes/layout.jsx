import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Layout() {
    return (
      <div className="h-[calc(100vh-100px)] max-w-full  
        sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1080px] xl:max-w-[1366px] 
        ml-auto mr-auto pl-[20px] pr-[20px]">
  
        <nav>
          <Navbar />
        </nav>
    
        <div className="h-[calc(100vh-100px)]">
          <Outlet />
        </div>
        
      </div>
    )
}

function RequireAuth() {
  const {currentUser} = useContext(AuthContext);
  
  if (!currentUser) {
    return <Navigate to="/entrar" />
  }

  return (
    currentUser && (
      <div className="h-[calc(100vh-100px)] max-w-full  
        sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1080px] xl:max-w-[1366px] 
        ml-auto mr-auto pl-[20px] pr-[20px]"
      >

        <nav>
          <Navbar />
        </nav>
    
        <div className="h-[calc(100vh-100px)]">
          <Outlet />
        </div>
      
      </div>
    )
  )
}

export {Layout, RequireAuth};