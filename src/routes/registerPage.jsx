import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import apiRequest from "../lib/apiRequest";

function RegisterPage() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        const formData = new FormData(e.target);

        const username = formData.get("usuario");
        const email = formData.get("email");
        const password = formData.get("senha");

        try {
            await apiRequest.post("/auth/cadastrar", {
                username, email, password
            });

            navigate("/entrar")
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
        
    }

    return (
        <div className="h-[100%] flex justify-center">
        <div className="xl:flex-[3] h-[100%] flex items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">

                <h1 className="text-[32px] font-bold">Criar uma conta</h1>
                <input name="usuario" type="text" placeholder="Nome do usuário"
                    className="p-[20px] border border-[#e0e0e0] rounded-[5px]"  />
                <input name="email" type="text" placeholder="Email"
                    className="p-[20px] border border-[#e0e0e0] rounded-[5px]"  />
                <input name="senha" type="password" placeholder="Senha"
                    className="p-[20px] border border-[#e0e0e0] rounded-[5px]"  />
                <button disabled={isLoading} className="p-[20px] rounded-[5px] border-0 bg-[#fece51] text-white font-bold 
                    text-[20px] cursor-pointer hover:bg-[#fece51]/80 disabled:cursor-not-allowed disabled:bg-[#fece51]/20">
                    Cadastrar
                </button>
                {error && <span className="text-red-600 text-[16px]">{error}</span>}
                <Link className="text-[14px] text-gray-500 border-b border-b-gray-300 w-max" to="/entrar">
                    Já tem uma conta?
                </Link>

            </form>
        </div>
        <div className="hidden xl:flex xl:flex-[2] items-center justify-center z-50">
            <img className="w-[100%]" src="/background.svg" alt="" />
        </div>
        </div>
    );
}

export default RegisterPage;