import Map from "../components/Map";
import Slider from "../components/Slider";

import { singlePostData, userData } from "../lib/dummydata";

function SinglePage() {
    const post = singlePostData[0];
    const formatPriceToRent = (price) => price.toFixed(2).replace('.', ',');
    const formatPriceToBuy = (price) => price.toFixed(3);

    let priceDisplay = "";
    if (post.buyOrRent === "Alugar") {
        priceDisplay = `R$ ${formatPriceToRent(post.priceToRent)} p/ dia`;
    } else if (post.buyOrRent === "Comprar") {
        priceDisplay = `R$ ${formatPriceToBuy(post.priceToBuy)}`;
    }

    let categoryIcon = "/popular.svg";
    let categoryText = "Popular";

    if (post.buyOrRent === "Alugar" && post.priceToRent <= 250) {
        categoryIcon = "/popular.svg";
        categoryText = "Popular";
    } else if (post.buyOrRent === "Alugar" && post.priceToRent > 250 && post.priceToRent <= 400) {
        categoryIcon = "/luxury.svg";
        categoryText = "Premium";
    } else if (post.buyOrRent === "Alugar" && post.priceToRent > 400) {
        categoryIcon = "/luxury.svg";
        categoryText = "Luxo";
    } 
    
    else if (post.buyOrRent === "Comprar" && post.priceToBuy <= 120.000) {
        categoryIcon = "/popular.svg";
        categoryText = "Popular";
    }
    else if (post.buyOrRent === "Comprar" && post.priceToBuy > 120.000 && post.priceToBuy <= 200.000) {
        categoryIcon = "/luxury.svg";
        categoryText = "Premium";
    } else if (post.buyOrRent === "Comprar" && post.priceToBuy > 200.000) {
        categoryIcon = "/luxury.svg";
        categoryText = "Luxo";
    } 

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-150px)] overflow-y-scroll lg:overflow-y-visible mt-[40px]">
            <div className="lg:flex-[3]">
                <div className="pr-[15px] lg:pr-[50px]">
                    <Slider images={post.images} />

                    <div className="mt-[40px]">
                        <div className="flex justify-between">

                            <div className="flex flex-col gap-[20px]">
                                <h1 className="font-[500] text-[25px] lg:text-[30px] truncate max-w-[500px]">{post.title}</h1>

                                <div className="flex gap-[5px] text-[#888] text-[14px]">
                                    <img className="svgcolor" width={16} height={16} src="/pin.svg" alt="" />
                                    <span>{post.address}</span>
                                </div>

                                <div className="p-[5px] font-[500] bg-[#fece51]/40 
                                rounded-[5px] w-max text-[16px] md:text-[20px]"
                                >
                                    {priceDisplay}
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center gap-[20px] px-[50px] rounded-[10px] bg-[#fece51]/40 font-[600]">
                                <img className="w-[50px] h-[50px] rounded-[50%] object-cover" src={userData.img} alt="Imagem de perfil" />
                                <span className="truncate max-w-[100px]">{userData.name}</span>
                            </div>

                        </div>
                        <div className="mt-[50px] text-[#555] leading-[20px]">
                            {post.description}
                        </div>
                    </div>

                </div>
            </div>
            <div className="lg:flex-[2] mt-[40px] lg:mt-0 lg:overflow-y-scroll pr-[15px] lg:pr-0">
                <div className="px-[20px] py-[20px] flex flex-col gap-[20px] bg-[#fcf5f3] rounded-[10px]">

                    <p className="font-bold text-[18px]">Características</p>
                    <div className="flex flex-col gap-[20px] py-[10px]">
                        <div className="bg-white p-[10px] rounded-[5px]">
                            <span className="font-semibold">{post.general1Title}</span>
                            <p className="text-[14px]">{post.general1Desc}</p>
                        </div>
                        <div className="bg-white p-[10px] rounded-[5px]">
                            <span className="font-semibold">{post.general2Title}</span>
                            <p className="text-[14px]">{post.general2Desc}</p>
                        </div>
                        <div className="bg-white p-[10px] rounded-[5px]">
                            <span className="font-semibold">{post.general3Title}</span>
                            <p className="text-[14px]">{post.general3Desc}</p>
                        </div>
                    </div>

                    <p className="font-bold text-[18px] mb-[5px]">Informações gerais</p>
                    <div className="flex flex-wrap justify-between gap-y-[20px]">
                        <div className="flex gap-x-[5px] items-center bg-white rounded-[5px] justify-center w-[calc(33.333%-20px)] p-1">
                            <img width={24} height={24} className="svgcolorlistpage" src="/brand.svg" alt="Ícone de estrela" />
                            <span className="mt-1">{post.brand}</span>
                        </div>
                        <div className="flex gap-x-[5px] items-center bg-white rounded-[5px] justify-center w-[calc(33.333%-20px)] p-1">
                            <img width={24} height={24} className="svgcolorlistpage" src="/condition.svg" alt="Ícone de lista" />
                            <span>{post.condition}</span>
                        </div>
                        <div className="flex gap-x-[5px] items-center bg-white rounded-[5px] justify-center w-[calc(33.333%-20px)] p-1">
                            <img width={24} height={24} className="svgcolorlistpage" src="/transmission.svg" alt="Ícone de transmissão de marcha" />
                            <span>{post.transmission}</span>
                        </div>
                        <div className="flex gap-x-[5px] items-center bg-white rounded-[5px] justify-center w-[calc(33.333%-20px)] p-1">
                            <img width={24} height={24} className="svgcolorlistpage" src="/fuel.svg" alt="Ícone de combustível" />
                            <span>{post.fuel}</span>
                        </div>
                        <div className="flex gap-x-[5px] items-center bg-white rounded-[5px] justify-center w-[calc(33.333%-20px)] p-1">
                            <img width={24} height={24} className="svgcolorlistpage" src="/color.svg" alt="Ícone de paleta de cores" />
                            <span>{post.color}</span>
                        </div>
                        <div className="flex gap-x-[5px] items-center bg-white rounded-[5px] justify-center w-[calc(33.333%-20px)] p-1">
                            <img width={24} height={24} className="svgcolorlistpage" src={categoryIcon} alt="Ícone de estrela" />
                            <span>{categoryText}</span>
                        </div>
                    </div>

                    <p className="font-bold text-[18px] mt-[10px] mb-[5px]">Localização</p>
                    <div className="w-[100%] h-[200px]">
                        <Map items={[singlePostData[0]]} />
                    </div>
                    
                    <div className="flex flex-col xl:flex-row gap-y-4 xl:gap-y-0 justify-between items-center mt-2">
                        <button className="flex justify-center xl:justify-between p-[20px] xl:p-[10px] w-[100%] xl:max-w-max items-center gap-x-2 bg-white hover:bg-white/20 border border-[#fece51] rounded-[5px] cursor-pointer">
                            <img width={16} height={16} src="/chat.svg" alt="Conversar com o vendedor" />
                            Mande uma mensagem
                        </button>
                        <button className="flex justify-center xl:justify-between p-[20px] xl:p-[10px] w-[100%] xl:max-w-max items-center gap-x-2 bg-white hover:bg-white/20 border border-[#fece51] rounded-[5px] cursor-pointer">
                            <img width={16} height={16} src="/save.svg" alt="Adicionar o carro aos favoritos" />
                            Adicionar aos favoritos
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePage;