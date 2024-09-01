import Chat from "../components/Chat";
import List from "../components/List";

function ProfilePage() {
    return (
        <div className="flex flex-col-reverse lg:flex-row h-[calc(100vh-180px)] lg:h-[calc(100vh-150px)] mt-[30px] overflow-y-scroll lg:overflow-y-auto">
            <div className="flex-[3] mt-[40px] lg:mt-0">
                <div className="pr-[20px] lg:pr-[50px] flex flex-col gap-[50px]">
                    <div className="flex items-center justify-between">
                        <h1 className="font-[500] text-[22px] md:text-[26px]">Informações do usuário</h1>
                        <button className="py-[12px] px-[24px] bg-[#fece51] hover:bg-[#fece51]/80 cursor-pointer border-0">Atualizar perfil</button>
                    </div>
                    <div className="flex flex-col gap-[20px]">
                        <span className="flex items-center gap-[20px]">Foto de perfil: <img className="w-[40px] h-[40px] rounded-[50%] mr-[10px] object-cover transition-all duration-[0.4s] ease-in-out hover:scale-[1.1] cursor-pointer" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Imagem de perfil" /></span>
                        <span className="flex items-center gap-[10px]">Nome: <b>Diego</b></span>
                        <span className="flex items-center gap-[10px]">Email cadastrado: <b>diegossantana068@gmail.com</b></span>
                    </div>
                    <div className="flex items-center justify-between">
                        <h1 className="font-[500] text-[22px] md:text-[26px]">Minhas publicações</h1>
                        <button className="py-[12px] px-[24px] bg-[#fece51] hover:bg-[#fece51]/80 cursor-pointer border-0">Criar anúncio</button>
                    </div>
                    <List />
                    <div>
                        <h1 className="font-[500] text-[26px]">Meus favoritos</h1>
                    </div>
                    <List />
                </div>
            </div>
            <div className="flex-[2] bg-[#fcf5f3] h-[100%]">
                <div className="px-[20px] h-[100%]">
                    <Chat />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;