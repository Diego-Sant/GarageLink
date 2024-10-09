import SearchBar from "../components/SearchBar";

function HomePage() {

    return (
        <div className="flex min-h-screen dark:text-white overflow-auto sm:overflow-hidden">
            <div className="flex flex-[3] justify-center items-center">
                <div className="xl:pr-[70px] flex flex-col gap-y-12 sm:gap-y-16 mb-10">

                    <div className="flex flex-col gap-y-4 -mt-[4rem] sm:-mt-[15rem] xl:-mt-[8rem]">

                        <h1 className="font-bold text-[36px] md:text-[46px] 
                        xl:text-[54px]">Compre ou alugue seu carro dos sonhos!
                        </h1>

                        <div className="text-[20px] flex flex-col gap-y-2">
                            <p><span className="text-[#fece51]">✓ </span> 
                            Mais de <span className="font-semibold">60.000 </span> 
                            localidades</p>

                            <p><span className="text-[#fece51]">✓ </span> 
                            Apoio ao cliente em mais de <span className="font-semibold">
                            30</span> idiomas</p>

                            <p><span className="text-[#fece51]">✓</span> Mais de 
                            <span className="font-semibold"> 5.000</span> carros 
                            diferentes</p>
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