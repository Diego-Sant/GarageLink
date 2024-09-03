import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import apiRequest from "../lib/apiRequest";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {updateUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        const formData = new FormData(e.target);

        const username = formData.get("usuario");
        const password = formData.get("senha");

        try {
            const res = await apiRequest.post("/auth/entrar", {
                username, password
            });

            updateUser(res.data)

            navigate("/");
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Erro desconhecido";
            setError(errorMessage);
        } finally {
            setIsLoading(false)
        }
        
    }

  return (
    <div className="h-[100%] flex">
        <div className="flex-[3] h-[100%] flex items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">

                <h1 className="text-[32px] font-bold">Bem vindo de volta!</h1>
                <input required name="usuario" type="text" placeholder="Nome do usuário"
                    className="p-[20px] border border-[#e0e0e0] rounded-[5px]" />
                <input required name="senha" type="password" placeholder="Senha"
                    className="p-[20px] border border-[#e0e0e0] rounded-[5px]" />
                <button disabled={isLoading} className="p-[20px] rounded-[5px] border-0 bg-[#fece51] text-white font-bold 
                        text-[20px] cursor-pointer hover:bg-[#fece51]/80 disabled:cursor-not-allowed disabled:bg-[#fece51]/20">
                        Entrar
                </button>
                {error && <span className="text-red-600 text-[16px]">{error}</span>}
                <Link className="text-[14px] text-gray-500 border-b border-b-gray-300 w-max" 
                    to="/cadastrar">
                    Ainda não tem uma conta?
                </Link>

            </form>
        </div>
        <div className="hidden xl:flex xl:flex-[2] items-center justify-center z-50">
            <img className="w-[100%]" src="/background.svg" alt="" />
        </div>
    </div>
  );
}

export default LoginPage;