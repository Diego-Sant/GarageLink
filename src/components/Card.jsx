import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../lib/apiRequest";
import { useFavorites } from "../context/FavoritesContext";
import { AuthContext } from "../context/AuthContext";

function Card({ item }) {
    const { favorites, toggleFavorite } = useFavorites();
    const isFavorited = favorites.includes(item.id);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const {currentUser} = useContext(AuthContext);

    const formatPriceToRent = (price) => price.toFixed(2).replace('.', ',');
    const formatPriceToBuy = (price) => {
        return price.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
    };

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

    const handleDelete = async () => {
        if (loading) return;
        setLoading(true);

        try {
            await apiRequest.delete(`/publicacoes/${item.id}`);
            window.location.reload();
        } catch (error) {
            console.log("Erro ao deletar o post:", error);
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = () => {
        setShowModal(true);
    };

    const handleModalConfirm = () => {
        setShowModal(false);
        handleDelete();
    };

    const handleModalCancel = () => {
        setShowModal(false);
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

                <div className="flex items-center justify-between">
                    <h2 className="-mt-[0.30rem] truncate max-w-[200px] md:max-w-max 
                        text-[20px] font-[600] text-[#444] transition-all duration-[0.4s] 
                        ease-in-out hover:text-black hover:scale-[1.01]
                        dark:text-white">
                        <Link to={`/carros/${item.id}`}>{item.title}</Link>
                    </h2>
                    {currentUser.id === item.userId && (
                        <div className="flex gap-2">
                            <Link to={`/atualizar/${item.id}`} className="cursor-pointer 
                                hover:bg-blue-400 p-1 rounded-full">
                                <img src="/pencil.svg" alt="Editar" 
                                    width={17} height={17}
                                    className="dark:filter dark:invert dark:brightness-[75%]
                                    dark:sepia-[98%] dark:saturate-[8%] dark:hue-rotate-[115deg]
                                    dark:contrast-[102%]"
                                />
                            </Link>
                            <div onClick={confirmDelete} className="cursor-pointer
                                hover:bg-red-400 p-1 rounded-full">
                                <img src="/trash.svg" alt="Deletar" width={17} height={17} />
                            </div>
                        </div>
                    )}
                </div>
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

                        {currentUser.id !== item.userId && (
                            <div className="flex justify-center border 
                            border-[#999] py-[5px] xl:py-[2px] px-[5px] 
                            rounded-[5px] cursor-pointer hover:bg-[#D3D3D3]
                            dark:bg-white">
                                <img width={16} height={16} src="/chat.svg" 
                                alt="Conversar" />
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
                    <div className="bg-white dark:bg-[#121212] dark:text-white p-6 rounded-lg 
                        shadow-lg w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Excluir publicação</h3>
                        <p className="mb-4">Você tem certeza que deseja excluir este post?</p>
                        <div className="flex justify-end gap-4">
                            <button 
                                onClick={handleModalConfirm} 
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Confirmar
                            </button>
                            <button 
                                onClick={handleModalCancel} 
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

export default Card;