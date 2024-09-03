import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import SearchBar from "../components/SearchBar";

function HomePage() {
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser)
    
    return (
        <div className="flex h-[100%]">
            <div className="flex flex-[3] justify-center items-center">
                <div className="xl:pr-[100px] -mt-[13rem] md:-mt-[15rem] xl:-mt-[4rem] flex flex-col gap-y-16">

                    <div className="flex flex-col gap-y-4">
                        <h1 className="font-bold text-[36px] md:text-[46px] xl:text-[54px]">Compre ou alugue seu carro dos sonhos!</h1>
                        <div className="text-[20px] flex flex-col gap-y-2">
                            <p><span className="text-[#fece51]">✓</span> Mais de <span className="font-semibold">60.000</span> localidades</p>
                            <p><span className="text-[#fece51]">✓</span> Apoio ao cliente em mais de <span className="font-semibold">30</span> idiomas</p>
                            <p><span className="text-[#fece51]">✓</span> Mais de <span className="font-semibold">5.000</span> carros diferentes</p>
                        </div>
                    </div>
                    
                    <SearchBar />

                </div>
            </div>
            <div className="relative hidden xl:flex flex-[3] z-[100] items-center">
                <img className="absolute xl:right-0 xl:top-10 w-[110%]" 
                    src="/background.svg" alt="Imagem de carros e cenários" 
                />
            </div>
        </div>
    )
}

export default HomePage;