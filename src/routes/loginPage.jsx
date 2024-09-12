import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";

function LoginPage() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {currentUser, updateUser} = useContext(AuthContext);
    const navigate = useNavigate();

    if (currentUser) {
        return <Navigate to="/" />
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        const formData = new FormData(e.target);

        const username = formData.get("username");
        const password = formData.get("password");

        try {
            const res = await apiRequest.post("/auth/entrar", {
                username, password
            });

            updateUser(res.data)

            navigate("/");
        } catch (error) {
            const errorMessage = error?.response?.data?.message;
            setError(errorMessage);
        } finally {
            setIsLoading(false)
        }
        
    }

  return (
    !currentUser && (
        <div className="h-[100%] flex mt-[70px] items-center">
            <div className="flex-[3] h-[100%] flex items-center justify-center">
                <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] dark:text-white">

                    <h1 className="text-[32px] font-bold">Bem vindo de volta!</h1>
                    <input required name="username" type="text" placeholder="Nome do usuário"
                        className="p-[20px] border border-[#e0e0e0] rounded-[5px] 
                        dark:bg-[#1a1a1a]" />
                    <input required name="password" type="password" placeholder="Senha"
                        className="p-[20px] border border-[#e0e0e0] rounded-[5px]
                        dark:bg-[#1a1a1a]" />
                    <button disabled={isLoading} className="p-[20px] rounded-[5px] border-0 bg-[#fece51] text-white font-bold 
                            text-[20px] cursor-pointer hover:bg-[#fece51]/80 dark:text-black
                            disabled:cursor-not-allowed disabled:bg-[#fece51]/20">
                            Entrar
                    </button>
                    {error && <span className="text-red-600 text-[16px]">{error}</span>}
                    <Link className="text-[14px] text-gray-500 border-b border-b-gray-300 
                    w-max dark:text-gray-400 dark:border-b-gray-400" 
                        to="/cadastrar">
                        Ainda não tem uma conta?
                    </Link>

                </form>
            </div>
            <div className="hidden xl:flex xl:flex-[2] items-center justify-center z-50">
                <img className="w-[100%]" src="/background.svg" alt="" />
            </div>
        </div>
    )
  );
}

export default LoginPage;