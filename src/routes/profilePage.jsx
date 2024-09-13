import { Suspense, useContext } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";

import Chat from "../components/Chat";
import List from "../components/List";
import apiRequest from "../lib/apiRequest";
import { AuthContext } from "../context/AuthContext";

function ProfilePage() {
    const data = useLoaderData();

    const {updateUser, currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const scrollToChat = () => {
        document.getElementById("chat-section").scrollIntoView({ behavior: "smooth" });
    };

    const scrollToProfile = () => {
        document.getElementById("profile-section").scrollIntoView({ behavior: "smooth" });
    };

    const handleLogout = async () => {
        try {
            await apiRequest.post("/auth/sair");
            updateUser(null);

            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col lg:flex-row mt-[30px] mb-[60px]">
            <div id="profile-section" className="flex-[3] mt-[40px] lg:mt-0">
                <div className="pr-[20px] lg:pr-[50px] flex flex-col gap-[50px]">
                    <div className="flex items-center justify-between gap-x-[10px]">
                        <h1 className="font-[500] text-[22px] md:text-[26px] dark:text-white">
                            Informações do usuário
                        </h1>
                        
                        <button onClick={scrollToChat}
                            className="lg:hidden py-[12px] px-[24px] bg-[#fece51] hover:bg-[#fece51]/80 cursor-pointer border-0">
                            Ver mensagens
                        </button>
                        <Link to="/perfil/atualizar">
                            <button className="py-[12px] px-[24px] bg-[#fece51] 
                                hover:bg-[#fece51]/80 cursor-pointer border-0">
                                Atualizar perfil
                            </button>
                        </Link>
                    
                    </div>
                    <div className="flex flex-col gap-[20px] border border-[#e0e0e0] 
                        p-[10px] rounded-[10px]">
                        
                        <span className="flex items-center gap-[20px] bg-[#fcf5f3] 
                            dark:bg-[#1a1a1a] dark:text-white max-w-max p-[10px] rounded-[10px]">
                            Foto de perfil: 

                            <img className="w-[40px] h-[40px] rounded-[50%] mr-[10px] 
                            object-cover transition-all duration-[0.4s] ease-in-out 
                            hover:scale-[1.1] cursor-pointer" 
                            src={currentUser.avatarURL || "/noavatar.svg"} 
                            alt="Imagem de perfil" />
                        </span>

                        <span className="flex flex-wrap break-words items-center 
                            gap-[10px] bg-[#fcf5f3] dark:bg-[#1a1a1a] 
                            max-w-max p-[10px] dark:text-white rounded-[10px]">
                            Nome: <b>{currentUser.username}</b>
                        </span>
                        
                        <span className="flex flex-wrap break-words items-center 
                            gap-[10px] bg-[#fcf5f3] dark:bg-[#1a1a1a] max-w-max 
                            p-[10px] rounded-[10px] dark:text-white">
                            Email cadastrado: <b>{currentUser.email}</b>
                        </span>

                        <button onClick={handleLogout}
                            className="w-[100px] bg-red-500 hover:bg-red-700 
                            border-0 py-[10px] px-[20px] text-white cursor-pointer 
                            rounded-[5px]">
                            Sair
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <h1 className="font-[500] text-[22px] md:text-[26px] dark:text-white">
                            Minhas publicações
                        </h1>

                        <Link to="/publicar">
                            <button className="py-[12px] px-[24px] bg-[#fece51] 
                                hover:bg-[#fece51]/80 cursor-pointer border-0">
                                Criar anúncio
                            </button>
                        </Link>
                    </div>
                    <Suspense fallback={
                        <div className="flex justify-center items-center min-h-[200px]">
                            <div className="loader"></div>
                        </div>}>
                        <Await resolve={data.postResponse} errorElement={<p>Erro ao carregar carros!</p>}>
                            {(postResponse) => {
                                const userPosts = postResponse.data.userPosts.filter(post => post.userId === currentUser.id);
                                return <List posts={userPosts} />;
                            }}
                        </Await>
                    </Suspense>
                    
                </div>
            </div>

            <div id="chat-section" className="flex-[2] bg-[#fcf5f3] dark:bg-[#2e2e2e] h-[200%] 
                lg:h-[105%] mt-[80px] lg:mt-0 rounded-[10px]">
                <div className="px-[20px] h-[100%] mb-4">
                    <Suspense fallback={
                        <div className="flex justify-center items-center min-h-[200px]">
                            <div className="loader"></div>
                        </div>}>
                        <Await resolve={data.chatResponse} errorElement={<p>Erro ao carregar mensagens!</p>}>
                            {(chatResponse) => <Chat chats={chatResponse.data} />}
                        </Await>
                    </Suspense>

                    <button onClick={scrollToProfile}
                        className="lg:hidden mt-[30px] py-[15px] px-[24px] 
                            bg-[#fece51] hover:bg-[#fece51]/80 cursor-pointer 
                            border-0">
                        Voltar para atualizar perfil
                    </button>
                    
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;