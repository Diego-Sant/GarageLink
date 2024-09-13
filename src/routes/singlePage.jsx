import { useLoaderData, useNavigate } from "react-router-dom";

import Map from "../components/Map";
import Slider from "../components/Slider";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";

function SinglePage() {
    const posts = useLoaderData();
    const {currentUser} = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [showModalMessage, setShowModalMessage] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleChat = async () => {
        if (loading) return;
        setShowModalMessage(true);
    };

    const handleSendMessage = async () => {
        if (loading || !message.trim()) return;
        setLoading(true);

        try {
            const response = await apiRequest.get(`/chats?userId=${posts.userId}`);
            const existingChat = response.data.find(chat =>
                chat.userIDs.includes(currentUser.id) && chat.userIDs.includes(posts.userId)
            );

            if (existingChat) {
                await apiRequest.post(`/mensagens/${existingChat.id}`, { text: message });
                navigate(`/perfil?id=${existingChat.id}`);
            } else {
                const newChatResponse = await apiRequest.post("/chats", {
                    receiverId: posts.userId
                });
                const newChat = newChatResponse.data;
                await apiRequest.post(`/mensagens/${newChat.id}`, { text: message });
                navigate(`/perfil?id=${newChat.id}`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setShowModalMessage(false);
            setMessage("");
        }
    };

    const formatPriceToRent = (price) => price.toFixed(2).replace('.', ',');
    const formatPriceToBuy = (price) => {
        return price.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function capitalizeWithExceptions(sentence) {
        const exceptions = [ "e", "de", "do", "da", "o", "com", "a", "à", "é", "um", "ou", "uma", 
            "para", "por", "em", "no", "na", "nos", "nas", "se", "sob", "às", "ao", "dos", "das", 
            "pelos", "pelas", "num", "numa", "ante", "até"
        ];
        return sentence
            .split(" ")
            .map((word, index) => {
                if (word === word.toUpperCase()) {
                    return word;
                }

                if (exceptions.includes(word.toLowerCase()) && index !== 0) {
                    return word.toLowerCase();
                }
                
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(" ");
    }

    let priceDisplay = "";
    if (posts.buyOrRent === "Alugar") {
        priceDisplay = `R$ ${formatPriceToRent(posts.priceToRent)} p/ dia`;
    } else if (posts.buyOrRent === "Comprar") {
        priceDisplay = `R$ ${formatPriceToBuy(posts.priceToBuy)}`;
    }

    let categoryIcon = "/popular.svg";
    let categoryText = "Popular";

    if (posts.buyOrRent === "Alugar" && posts.priceToRent <= 250) {
        categoryIcon = "/popular.svg";
        categoryText = "Popular";
    } else if (posts.buyOrRent === "Alugar" && posts.priceToRent > 250 && posts.priceToRent <= 400) {
        categoryIcon = "/luxury.svg";
        categoryText = "Premium";
    } else if (posts.buyOrRent === "Alugar" && posts.priceToRent > 400) {
        categoryIcon = "/luxury.svg";
        categoryText = "Luxo";
    } 
    
    else if (posts.buyOrRent === "Comprar" && posts.priceToBuy <= 120.000) {
        categoryIcon = "/popular.svg";
        categoryText = "Popular";
    }
    else if (posts.buyOrRent === "Comprar" && posts.priceToBuy > 120.000 && posts.priceToBuy <= 200.000) {
        categoryIcon = "/luxury.svg";
        categoryText = "Premium";
    } else if (posts.buyOrRent === "Comprar" && posts.priceToBuy > 200.000) {
        categoryIcon = "/luxury.svg";
        categoryText = "Luxo";
    } 

    return (
        <div className="flex flex-col lg:flex-row mt-[40px]">
            <div className="lg:flex-[3]">
                <div className="pr-[15px] lg:pr-[50px]">
                    <Slider images={posts.images} />

                    <div className="mt-[40px]">
                        <div className="flex justify-between">

                            <div className="flex flex-col gap-[20px]">
                                <h1 className="font-[500] text-[25px] lg:text-[30px] 
                                    truncate max-w-[500px] dark:text-white">
                                    {capitalizeWithExceptions(posts.title)}
                                </h1>

                                <div className="flex gap-[5px] text-[#888] text-[14px]">
                                    <img className="svgcolor" width={16} height={16} 
                                    src="/pin.svg" alt="" />
                                    <span className="dark:text-[#E0E0E0]">
                                        {capitalizeWithExceptions(posts.address)}
                                    </span>
                                </div>

                                <div className="p-[5px] font-[500] bg-[#fece51]/40 
                                rounded-[5px] w-max text-[16px] md:text-[20px]
                                dark:bg-[#fece51]">
                                    {priceDisplay}
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center 
                                gap-[20px] px-[50px] rounded-[10px] 
                                bg-[#fece51]/40 dark:bg-[#fece51] font-[600]">

                                <img className="w-[55px] h-[55px] rounded-[50%] 
                                object-cover" src={posts.user.avatarURL} 
                                alt="Imagem de perfil" />

                                <span className="truncate max-w-[100px]">
                                    {capitalizeWithExceptions(posts.user.username)}
                                </span>
                            </div>

                        </div>

                        <div className="mt-[50px] text-[#555] 
                        leading-[20px] dark:text-[#E0E0E0]">
                            {capitalizeFirstLetter(posts.postDetail.description)}
                        </div>

                        {currentUser?.id !== posts.user.id && (
                                    <div onClick={handleChat} className="flex flex-col xl:flex-row gap-y-4 
                                        xl:gap-y-0 justify-center xl:justify-start items-center mt-2 lg:mb-10 xl:mb-0">
                                        
                                        <button className="flex justify-center xl:justify-start p-[20px] 
                                            xl:p-[20px] w-[100%] xl:max-w-max items-center gap-x-2 
                                            bg-white hover:bg-white/20 border dark:text-white
                                            dark:bg-[#1a1a1a] dark:hover:bg-[#1d1c1c] border-[#fece51] 
                                            dark:border-0 rounded-[5px] cursor-pointer">

                                            <img className="dark:filter dark:invert dark:brightness-[75%]
                                            dark:sepia-[98%] dark:saturate-[8%] dark:hue-rotate-[115deg]
                                            dark:contrast-[102%]" width={16} height={16} src="/chat.svg" alt="Conversar com o vendedor" />
                                            Mande uma mensagem

                                        </button>

                                    </div>
                                )}
                    </div>

                </div>
            </div>
            <div className="lg:flex-[2] mt-[40px] lg:mt-0 pr-[15px] lg:pr-0">
                <div className="px-[20px] py-[20px] flex flex-col gap-[20px] bg-[#fcf5f3] dark:bg-[#2e2e2e] rounded-[10px]">

                    {posts.postDetail.general1Title && posts.postDetail.general2Title && posts.postDetail.general3Title ? (
                        <>
                            <p className="font-bold text-[18px] dark:text-white">Características</p>
                            <div className="flex flex-col gap-[20px] py-[10px]">

                                <div className="bg-white dark:bg-[#1a1a1a] 
                                    dark:text-white p-[10px] rounded-[5px]">
                                    <span className="font-semibold capitalize">{capitalizeWithExceptions(posts.postDetail.general1Title)}</span>
                                    <p className="text-[14px] flex flex-wrap">{capitalizeFirstLetter(posts.postDetail.general1Desc)}</p>
                                </div>

                                <div className="bg-white dark:bg-[#1a1a1a] 
                                    dark:text-white p-[10px] rounded-[5px]">
                                    <span className="font-semibold capitalize">{capitalizeWithExceptions(posts.postDetail.general2Title)}</span>
                                    <p className="text-[14px] lex flex-wrap">{capitalizeFirstLetter(posts.postDetail.general2Desc)}</p>
                                </div>

                                <div className="bg-white dark:bg-[#1a1a1a] 
                                    dark:text-white p-[10px] rounded-[5px]">
                                    <span className="font-semibold capitalize">{capitalizeWithExceptions(posts.postDetail.general3Title)}</span>
                                    <p className="text-[14px] lex flex-wrap">{capitalizeFirstLetter(posts.postDetail.general3Desc)}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        ""
                    )}

                    <p className="font-bold text-[18px] mb-[5px] dark:text-white">Informações gerais</p>
                    
                    <div className="flex flex-wrap justify-between gap-y-[20px]">

                        <div className="flex gap-x-[5px] items-center bg-white 
                            dark:bg-[#1a1a1a] dark:text-white rounded-[5px] 
                            justify-center w-[calc(33.333%-20px)] p-1">
                            <img width={24} height={24} className="svgcolorlistpage" src="/brand.svg" alt="Ícone de estrela" />
                            <span className="mt-1">{posts.brand}</span>
                        </div>

                        <div className="flex gap-x-[5px] items-center bg-white 
                            dark:bg-[#1a1a1a] dark:text-white rounded-[5px] 
                            justify-center w-[calc(33.333%-20px)] p-1">
                            <img width={24} height={24} className="svgcolorlistpage" src="/condition.svg" alt="Ícone de lista" />
                            <span>{posts.condition}</span>
                        </div>

                        <div className="flex gap-x-[5px] items-center bg-white 
                            dark:bg-[#1a1a1a] dark:text-white rounded-[5px] 
                            justify-center w-[calc(33.333%-20px)] p-1">
                            <img width={24} height={24} className="svgcolorlistpage" src="/transmission.svg" alt="Ícone de transmissão de marcha" />
                            <span>{posts.transmission}</span>
                        </div>
                        
                        <div className="flex gap-x-[5px] items-center bg-white 
                            dark:bg-[#1a1a1a] dark:text-white rounded-[5px] 
                            justify-center w-[calc(33.333%-20px)] p-1">
                            <img width={24} height={24} className="svgcolorlistpage" src="/fuel.svg" alt="Ícone de combustível" />
                            <span>{posts.fuel}</span>
                        </div>

                        <div className="flex gap-x-[5px] items-center bg-white 
                            dark:bg-[#1a1a1a] dark:text-white rounded-[5px] 
                            justify-center w-[calc(33.333%-20px)] p-1">
                            <img width={24} height={24} className="svgcolorlistpage" src="/color.svg" alt="Ícone de paleta de cores" />
                            <span>{posts.color}</span>
                        </div>

                        <div className="flex gap-x-[5px] items-center bg-white 
                            dark:bg-[#1a1a1a] dark:text-white rounded-[5px] 
                            justify-center w-[calc(33.333%-20px)] p-1">
                            <img width={24} height={24} className="svgcolorlistpage" src={categoryIcon} alt="Ícone de estrela" />
                            <span>{categoryText}</span>
                        </div>
                    </div>

                    <p className="font-bold text-[18px] mt-[10px] mb-[5px] dark:text-white">Localização</p>
                    <div className="w-[100%] h-[200px]">
                        <Map items={[posts]} />
                    </div>
                </div>
            </div>

            {showModalMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
                    <div className="bg-white dark:bg-[#121212] dark:text-white p-6 rounded-lg 
                        shadow-lg w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Enviar Mensagem ao vendedor</h3>
                        <textarea value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="4"
                            className="w-full p-2 border border-gray-300 rounded-lg 
                            dark:bg-[#1a1a1a] resize-none"
                            placeholder="Digite sua mensagem..."
                        />
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                onClick={handleSendMessage}
                                className="bg-[#fece51] text-black px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Enviar
                            </button>
                            <button
                                onClick={() => setShowModalMessage(false)}
                                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SinglePage;