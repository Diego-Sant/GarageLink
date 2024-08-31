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

    return (
        <div className="flex h-[100%]">
            <div className="flex-[3]">
                <div className="pr-[50px]">
                    <Slider images={post.images} />
                    <div className="">
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-[20px]">
                                <h1 className="font-[500]">{post.title}</h1>
                                <div className="flex gap-[5px] items-center text-[#888] text-[14px]">
                                    <img width={16} height={16} src="/pin.svg" alt="" />
                                    <span>{post.address}</span>
                                </div>
                                <div className="p-[5px] font-[500] bg-[#fece51]/40 rounded-[5px] w-max">
                                    {priceDisplay}
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-[20px] px-[50px] rounded-[10px] bg-[#fece51]/40 font-[600]">
                                <img className="w-[50px] h-[50px] rounded-[50%] object-cover" src={userData.img} alt="Imagem de perfil" />
                                <span>{userData.name}</span>
                            </div>
                        </div>
                        <div className="mt-[50px] text-[#555] leading-[20px]">
                            {post.description}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-[2]">
                <div className="px-[20px]">

                </div>
            </div>
        </div>
    )
}

export default SinglePage;