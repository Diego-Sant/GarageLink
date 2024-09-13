import { useContext, useEffect, useRef, useState } from "react";

import * as timeago from 'timeago.js'
import TimeAgo from "timeago-react";

import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";

const customPtBR = (number, index, totalSec) => {
    return [
      ['agora', ''],
      ['%s segundos atrás', ''],
      ['1 minuto atrás', ''],
      ['%s minutos atrás', ''],
      ['1 hora atrás', ''],
      ['%s horas atrás', ''],
      ['1 dia atrás', ''],
      ['%s dias atrás', ''],
      ['1 semana atrás', ''],
      ['%s semanas atrás', ''],
      ['1 mês atrás', ''],
      ['%s meses atrás', ''],
      ['1 ano atrás', ''],
      ['%s anos atrás', ''],
    ][index];
};

function Chat({ chats }) {
    const [chat, setChat] = useState(null);
    const {currentUser} = useContext(AuthContext);

    timeago.register('pt_BR', customPtBR);

    const messageEndRef = useRef()

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chat])

    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await apiRequest("/chats/"+ id);
            setChat({...res.data, receiver})

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const text = formData.get("text");

        if(!text) return;

        try {
            const res = await apiRequest.post("/mensagens/" + chat.id, {text});
            setChat(prev => ({...prev, message: [...prev.message, res.data]}));
            e.target.reset();

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="h-[800px] flex flex-col">
            <div className="flex-[1] flex flex-col gap-[20px] overflow-y-auto">
                <h1 className="font-[500] mt-2 text-[20px] dark:text-white">Mensagens</h1>

                {
                    chats?.map(chat => (
                        <div key={chat.id} className={`p-[20px] rounded-[10px] flex 
                                items-center cursor-pointer
                                ${chat.seenBy.includes(currentUser.id) 
                                ? "bg-white text-black hover:bg-white/60 dark:bg-[#1a1a1a] dark:hover:bg-[#4d4d4d] dark:text-white" 
                                : "bg-[#fece51]/80 hover:bg-[#fece51]/60 dark:bg-[#fece51] dark:hover:bg-[#ffdf82]  dark:text-black"}      
                            `} onClick={() => handleOpenChat(chat.id, chat.receiver)}>
                                
                                <img className="w-[40px] h-[40px] rounded-[50%] mr-[10px] 
                                object-cover transition-all duration-[0.4s] 
                                ease-in-out hover:scale-[1.1] cursor-pointer" 
                                src={chat.receiver.avatarURL || "/noavatar.svg"} 
                                alt="Imagem de perfil" />
                                
                                <span className="pr-[20px] font-[500]">
                                    {chat.receiver.username}
                                </span>
                                    
                                <div className="truncate max-w-[300px] flex flex-row-reverse gap-2">
                                    {chat.lastMessage}
                                    {chat.lastMessageSenderId === currentUser.id && (
                                        <img src={chat.seenBy.includes(chat.receiver.id) 
                                        ? "/seencheck.svg" : "/unseencheck.svg"} 
                                            width={24} height={24} alt="Check" 
                                        />
                                    )}
                                </div>
                        </div>
                    )) 
                }
                
            </div>

            {chat && (
                <div className="flex-[1] bg-white rounded-[10px] flex flex-col 
                justify-between h-[100%] dark:dark:bg-[#1a1a1a]">
                    <div>
                        <div key={chat.id} className="bg-[#fece51]/80 p-[20px] font-bold flex items-center 
                            justify-between mb-[20px] rounded-[10px] dark:bg-[#fece51]">
                            <div className="flex items-center">
                                <img className="w-[30px] h-[30px] rounded-[50%] mr-[10px] object-cover transition-all duration-[0.4s] ease-in-out hover:scale-[1.1] cursor-pointer" src={chat.receiver.avatarURL || "/noavatar.svg"} alt="Imagem de perfil" />
                                <span className="pr-[20px] font-[500]">
                                    {chat.receiver.username}
                                </span>
                            </div>
                            <span onClick={() => setChat(null)} className="cursor-pointer transition-all duration-[0.4s] ease-in-out hover:scale-[1.1]">
                                <img width={24} height={24} src="/close.svg" alt="Fechar a imagem" />
                            </span>
                        </div>

                        <div className="overflow-y-auto h-[290px] p-[20px] flex flex-col gap-[20px]">
                            {chat.message.map((message) => (
                                <div key={message.id} className={`flex flex-col gap-y-1 ${message.userId === currentUser.id ? "items-end" : "items-start"}`}>
                                    <p className={`max-w-[200px] break-words rounded-[10px] p-[7px] ${message.userId === currentUser.id ? "text-right bg-[#fece51]/20 dark:bg-[#ffdd99]" : "text-start bg-[#fece51]/70 dark:bg-[#fece51]"}`}>
                                        {message.text}
                                    </p>
                                    <span className="text-[12px] dark:bg-[#fece51]/60 bg-[#fece51]/40 rounded-[5px] p-[3px] max-w-max">
                                        <TimeAgo datetime={message.createdAt} locale='pt_BR' />
                                    </span>
                                </div>
                            ))}
                            <div ref={messageEndRef}></div>
                        </div>

                    </div>

                    <form onSubmit={handleSubmit} className="border-t-[2px] 
                        border-[#fece51]/80 h-[60px] flex items-center 
                        justify-between">

                        <textarea className="flex-[3] min-h-[30px] border-0 p-[5px] 
                            resize-none dark:bg-[#1a1a1a] dark:outline-none
                            dark:text-white overflow-y-auto"
                            name="text" 
                            id=""
                        ></textarea>

                        <button className="flex-[1] bg-[#fece51]/70 hover:bg-[#fece51]/90 
                            h-[100%] border-0 cursor-pointer dark:bg-[#fece51]">
                            Enviar
                        </button>

                    </form>
                </div>
            )

            }
        </div>
    )
}

export default Chat;