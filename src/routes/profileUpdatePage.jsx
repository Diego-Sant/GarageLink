import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";

function ProfileUpdatePage() {
    const [error, setError] = useState("");
    const {currentUser, updateUser} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const formData = new FormData(e.target);

        const {username, email, password} = Object.fromEntries(formData);

        try {
            const res = await apiRequest.put(`/usuarios/${currentUser.id}`, {username, email, password});

            updateUser(res.data);
            navigate("/perfil")

        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.message);
        }
    }
  
    return (
    <div className="h-[100%] flex flex-col md:flex-row overflow-y-auto">
        <div className="flex-[3] flex items-center justify-center">
                <form onSubmit={handleSubmit}
                    className="flex flex-col gap-[20px] w-[300px] mt-[60px] md:mt-0"
                >
                    <h1 className="text-[32px] font-bold">Atualizar perfil</h1>
                    <div className="flex flex-col gap-[5px]">
                        <label htmlFor="username">Usuário</label>
                        <input className="py-[4px] px-[10px] border border-[#e0e0e0] rounded-[5px]"
                        defaultValue={currentUser.username}
                        id="username"
                        name="username"
                        type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-[5px]">
                        <label htmlFor="email">Email</label>
                        <input className="py-[4px] px-[10px] border border-[#e0e0e0] rounded-[5px]"
                        defaultValue={currentUser.email}
                        id="email"
                        name="email"
                        type="email"
                        />
                    </div>
                    <div className="flex flex-col gap-[5px]">
                        <label htmlFor="password">Senha</label>
                        <input className="py-[4px] px-[10px] border border-[#e0e0e0] rounded-[5px]"
                        id="password" 
                        name="password" 
                        type="password" 
                        />
                    </div>
                    <button className="p-[20px] rounded-[5px] border-0 bg-[#fece51] text-white font-bold 
                        text-[20px] cursor-pointer hover:bg-[#fece51]/80">
                        Atualizar
                    </button>
                    {error && <span className="text-red-600 text-[16px]">{error}</span>}
                </form>
        </div>
        <div className="relative flex-[3] flex flex-col gap-[20px] mb-[50px] mt-[60px] md:mb-0 md:mt-0 items-center justify-center group">
            <div className="relative w-[70%] cursor-pointer">
                <img src={currentUser.avatar || "/noavatar.svg"} alt="Imagem de perfil" 
                className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gray-600 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <img src="/camera.svg" alt="Adicionar Imagem" className="w-10 h-10"/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ProfileUpdatePage;