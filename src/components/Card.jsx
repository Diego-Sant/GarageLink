import { useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../lib/apiRequest";
import { useFavorites } from "../context/FavoritesContext";

function Card({ item }) {
    const { favorites, toggleFavorite } = useFavorites();
    const isFavorited = favorites.includes(item.id);
    const [loading, setLoading] = useState(false);

    const formatPriceToRent = (price) => price.toFixed(2).replace('.', ',');
    const formatPriceToBuy = (price) => price.toFixed(3);

    let priceDisplay = "";
    if (item.buyOrRent === "Alugar") {
        priceDisplay = `R$ ${formatPriceToRent(item.priceToRent)} p/ dia`;
    } else if (item.buyOrRent === "Comprar") {
        priceDisplay = `R$ ${formatPriceToBuy(item.priceToBuy)}`;
    }

    const handleFavorite = async () => {
        if (loading) return;
        setLoading(true);

        try {
            await apiRequest.post("/usuarios/favoritos", { postId: item.id });
            toggleFavorite(item.id);
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 900);
            window.location.reload();
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-[20px]">
            <Link to={`/carros/${item.id}`} className="flex-[2] h-[200px]">
                <img 
                    className="w-[100%] h-[100%] object-cover rounded-[10px] 
                        transition-all duration-[0.4s] ease-in-out hover:scale-[1.05]" 
                    src={item.images?.[0] || ""} 
                    alt={item.title} 
                />
            </Link>

            <div className="flex-[3] flex flex-col justify-between gap-[10px]">

                <h2 className="-mt-[0.30rem] truncate max-w-[200px] md:max-w-max 
                    text-[20px] font-[600] text-[#444] transition-all duration-[0.4s] 
                    ease-in-out hover:text-black hover:scale-[1.01]
                    dark:text-white">
                    <Link to={`/carros/${item.id}`}>{item.title}</Link>
                </h2>
                <p className="flex gap-[5px] xl:-mt-[2.1rem] text-[14px] 
                    text-[#888]">
                    <img className="svgcolor" width={16} height={16} src="/pin.svg" alt="Ícone de localização" />
                    <span className="truncate max-w-[190px] md:max-w-max dark:text-[#E0E0E0]">{item.address}</span>
                </p>
                
                <p className="text-[20px] xl:-mt-[1.7rem] font-[500] 
                    bg-[#fece51]/40 rounded-[5px] p-[5px] w-max
                    dark:bg-[#fece51]">
                    {priceDisplay}
                </p>

                <div className="flex -mt-[1rem] sm:-mt-[1.9rem] md:-mt-0 justify-between gap-[10px] items-center">
                    
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 xl:flex 
                        gap-[20px] text-[14px] items-center mt-[30px] xl:mt-0">

                        <div className="flex justify-center items-center gap-[5px] 
                            bg-[#f5f5f5] dark:bg-[#1a1a1a] dark:text-white
                            p-[5px] rounded-[5px]">
                            <span className="truncate max-w-[80px]">{item.brand}</span>
                        </div>

                        <div className="flex justify-center items-center gap-[5px] 
                            bg-[#f5f5f5] dark:bg-[#1a1a1a] dark:text-white
                            p-[5px] rounded-[5px]">
                            <span className="truncate max-w-[80px]">{item.condition}</span>
                        </div>

                        <div className="flex justify-center items-center gap-[5px] 
                            bg-[#f5f5f5] dark:bg-[#1a1a1a] dark:text-white
                            p-[5px] rounded-[5px]">
                            <span className="truncate max-w-[80px]">{item.color}</span>
                        </div>

                        <div className="flex justify-center items-center gap-[5px] 
                            bg-[#f5f5f5] dark:bg-[#1a1a1a] dark:text-white
                            p-[5px] rounded-[5px]">
                            <span className="truncate max-w-[80px]">{item.transmission}</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col 
                        xl:flex-row mt-[30px] xl:mt-0  gap-[20px]">

                        <div disabled={loading} onClick={handleFavorite} className={`flex justify-center border 
                            py-[5px] xl:py-[2px] px-[5px] rounded-[5px]
                            ${isFavorited  ? 'bg-[#fece51] hover:bg-[#fece51]/70 border-[#2f2f2f] disabled:bg-[#f0b500]' 
                            : 'bg-white dark:bg-white border-[#999] hover:bg-white/20 disabled:bg-gray-600/20'}
                            cursor-pointer disabled:cursor-not-allowed
                            disabled:border-0
                        `}>
                            <img width={16} height={16} src="/save.svg" alt="Salvar" />
                        </div>

                        <div className="flex justify-center border 
                        border-[#999] py-[5px] xl:py-[2px] px-[5px] 
                        rounded-[5px] cursor-pointer hover:bg-[#D3D3D3]
                        dark:bg-white">
                            <img width={16} height={16} src="/chat.svg" 
                            alt="Conversar" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;