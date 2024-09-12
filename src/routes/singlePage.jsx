import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext"
import Map from "../components/Map";
import Slider from "../components/Slider";
import apiRequest from "../lib/apiRequest";
import FavoriteButton from "../components/FavoriteButton";

function SinglePage() {
    const posts = useLoaderData();
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [favorited, setFavorited] = useState(posts.isSaved);
    const [loading, setLoading] = useState(false);

    const handleFavorite = async () => {
        if (loading) return;
    
        setLoading(true);
        setFavorited((prev) => !prev);
    
        if (!currentUser) {
            navigate("/entrar");
        }
    
        try {
            await apiRequest.post("/usuarios/favoritos", { postId: posts.id });

        } catch (error) {
            console.log(error);
            setFavorited((prev) => !prev);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 900);
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

                                <img className="w-[50px] h-[50px] rounded-[50%] 
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
                    
                    <div className="flex flex-col xl:flex-row gap-y-4 xl:gap-y-0 justify-between items-center mt-2">
                        
                        <button className="flex justify-center xl:justify-between p-[20px] 
                            xl:p-[10px] w-[100%] xl:max-w-max items-center gap-x-2 
                            bg-white hover:bg-white/20 border dark:text-white
                            dark:bg-[#121212] dark:hover:bg-[#121212]/80 border-[#fece51] 
                            dark:border-0 rounded-[5px] cursor-pointer">

                            <img className="dark:filter dark:invert dark:brightness-[75%]
                            dark:sepia-[98%] dark:saturate-[8%] dark:hue-rotate-[115deg]
                            dark:contrast-[102%]" width={16} height={16} src="/chat.svg" alt="Conversar com o vendedor" />
                            Mande uma mensagem

                        </button>

                        <button disabled={loading} onClick={handleFavorite} 
                            className={`flex justify-center xl:justify-between 
                                items-center gap-x-4 border p-[20px] xl:p-[10px]
                                ${favorited ? 'bg-[#fece51] dark:hover:bg-[#fece51]/90 hover:bg-[#fece51]/70 border-0 disabled:bg-[#f0b500]' 
                                : 'bg-white dark:text-white border-[#fece51] hover:bg-white/20 disabled:bg-gray-600/20 dark:bg-[#121212] dark:hover:bg-[#121212]/80'} 
                                rounded-[5px] cursor-pointer w-[100%] xl:w-[50%] 
                                mb-5 xl:mb-0 xl:h-[45px] disabled:cursor-not-allowed
                                disabled:border-0 dark:border-0`}>

                            <FavoriteButton isFavorited={favorited} onClick={handleFavorite} />
                            <p className={favorited ? "text-[20px] xl:text-[17px] 2xl:text-[18px] xl:mr-1" : "text-[16px]"}>{favorited ? "Na lista de favoritos" : "Adicionar aos favoritos"}</p>
                        
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SinglePage;