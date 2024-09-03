import { useState } from "react";

function Chat() {
    const [chat, setChat] = useState(true);

    return (
        <div className="h-[850px] lg:h-[calc(100vh-150px)] flex flex-col">
            <div className="flex-[1] flex flex-col gap-[20px] overflow-y-auto">
                <h1 className="font-[500] mt-2 text-[20px]">Mensagens</h1>
                <div className="bg-white hover:bg-white/60 p-[20px] rounded-[10px] flex items-center cursor-pointer">
                    <img className="w-[40px] h-[40px] rounded-[50%] mr-[10px] object-cover transition-all duration-[0.4s] ease-in-out hover:scale-[1.1] cursor-pointer" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Imagem de perfil" />
                    <span className="pr-[20px] font-[500]">Diego2</span>
                    <p className="truncate max-w-[300px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum culpa neque aliquam ullam cumque nam, ex autem voluptas. Quis iste corporis ratione! Enim placeat assumenda deserunt illo ea dolores veritatis!</p>
                </div>
                <div className="bg-white hover:bg-white/60 p-[20px] rounded-[10px] flex items-center cursor-pointer">
                    <img className="w-[40px] h-[40px] rounded-[50%] mr-[10px] object-cover transition-all duration-[0.4s] ease-in-out hover:scale-[1.1] cursor-pointer" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Imagem de perfil" />
                    <span className="pr-[20px] font-[500]">Diego2</span>
                    <p className="truncate max-w-[300px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum culpa neque aliquam ullam cumque nam, ex autem voluptas. Quis iste corporis ratione! Enim placeat assumenda deserunt illo ea dolores veritatis!</p>
                </div>
                <div className="bg-white hover:bg-white/60 p-[20px] rounded-[10px] flex items-center cursor-pointer">
                    <img className="w-[40px] h-[40px] rounded-[50%] mr-[10px] object-cover transition-all duration-[0.4s] ease-in-out hover:scale-[1.1] cursor-pointer" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Imagem de perfil" />
                    <span className="pr-[20px] font-[500]">Diego2</span>
                    <p className="truncate max-w-[300px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum culpa neque aliquam ullam cumque nam, ex autem voluptas. Quis iste corporis ratione! Enim placeat assumenda deserunt illo ea dolores veritatis!</p>
                </div>
                <div className="bg-white hover:bg-white/60 p-[20px] rounded-[10px] flex items-center cursor-pointer">
                    <img className="w-[40px] h-[40px] rounded-[50%] mr-[10px] object-cover transition-all duration-[0.4s] ease-in-out hover:scale-[1.1] cursor-pointer" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Imagem de perfil" />
                    <span className="pr-[20px] font-[500]">Diego2</span>
                    <p className="truncate max-w-[300px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum culpa neque aliquam ullam cumque nam, ex autem voluptas. Quis iste corporis ratione! Enim placeat assumenda deserunt illo ea dolores veritatis!</p>
                </div>
                <div className="bg-white hover:bg-white/60 p-[20px] rounded-[10px] flex items-center cursor-pointer">
                    <img className="w-[40px] h-[40px] rounded-[50%] mr-[10px] object-cover transition-all duration-[0.4s] ease-in-out hover:scale-[1.1] cursor-pointer" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Imagem de perfil" />
                    <span className="pr-[20px] font-[500]">Diego2</span>
                    <p className="truncate max-w-[300px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum culpa neque aliquam ullam cumque nam, ex autem voluptas. Quis iste corporis ratione! Enim placeat assumenda deserunt illo ea dolores veritatis!</p>
                </div>
                <div className="bg-white hover:bg-white/60 p-[20px] rounded-[10px] flex items-center cursor-pointer">
                    <img className="w-[40px] h-[40px] rounded-[50%] mr-[10px] object-cover transition-all duration-[0.4s] ease-in-out hover:scale-[1.1] cursor-pointer" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Imagem de perfil" />
                    <span className="pr-[20px] font-[500]">Diego2</span>
                    <p className="truncate max-w-[300px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum culpa neque aliquam ullam cumque nam, ex autem voluptas. Quis iste corporis ratione! Enim placeat assumenda deserunt illo ea dolores veritatis!</p>
                </div>
            </div>
            {chat && (
                <div className="flex-[1] bg-white flex flex-col justify-between h-[100%]">
                    <div>
                        <div className="bg-[#fece51]/80  p-[20px] font-bold flex items-center justify-between mb-[20px]">
                            <div className="flex items-center">
                                <img className="w-[30px] h-[30px] rounded-[50%] mr-[10px] object-cover transition-all duration-[0.4s] ease-in-out hover:scale-[1.1] cursor-pointer" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Imagem de perfil" />
                                <span className="pr-[20px] font-[500]">Diego2</span>
                            </div>
                            <span onClick={() => setChat(null)} className="cursor-pointer transition-all duration-[0.4s] ease-in-out hover:scale-[1.1]">
                                <img width={24} height={24} src="/close.svg" alt="Fechar a imagem" />
                            </span>
                        </div>
                        <div className="overflow-y-auto h-[290px] p-[20px] flex flex-col gap-[20px]">
                            <div className="flex flex-col items-start text-start gap-y-1">
                                <p className="flex flex-wrap max-w-[500px] bg-[#fece51]/20 rounded-[10px] p-[5px]">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, libero quisquam voluptatibus exercitationem dolore recusandae fugiat eius quo veritatis placeat. Eum, quo? Nisi eius rem eaque veniam incidunt sit dignissimos.
                                </p>
                                <span className="text-[12px] bg-[#fece51]/40 rounded-[5px] p-[2px]">1 hora atrás</span>
                            </div>
                            <div className="flex flex-col items-end text-right gap-y-1">
                                <p className="flex flex-wrap max-w-[500px] bg-[#fece51]/70 rounded-[10px] p-[5px]">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, libero quisquam voluptatibus exercitationem dolore recusandae fugiat eius quo veritatis placeat. Eum, quo? Nisi eius rem eaque veniam incidunt sit dignissimos.
                                </p>
                                <span className="text-[12px] bg-[#fece51]/40 rounded-[5px] p-[2px]">1 hora atrás</span>
                            </div>
                            <div className="flex flex-col items-start text-start gap-y-1">
                                <p className="flex flex-wrap max-w-[500px] bg-[#fece51]/20 rounded-[10px] p-[5px]">
                                    Lorem ipsum
                                </p>
                                <span className="text-[12px] bg-[#fece51]/40 rounded-[5px] p-[2px]">1 hora atrás</span>
                            </div>
                        </div>
                    </div>
                    <div className="border-t-[2px] border-[#fece51]/80 h-[60px] flex items-center justify-between overflow-y-auto">
                        <textarea className="flex-[3] h-[100%] border-0 p-[20px] resize-none" name="" id=""></textarea>
                        <button className="flex-[1] bg-[#fece51]/70 hover:bg-[#fece51]/90 h-[100%] border-0 cursor-pointer">Enviar</button>
                    </div>
                </div>
            )

            }
        </div>
    )
}

export default Chat;