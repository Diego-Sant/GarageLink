import SearchBar from "../components/SearchBar";

function HomePage() {
    return (
        <div className="flex h-[100%]">
            <div className="flex flex-[3] justify-center items-center">
                <div className="xl:pr-[100px] flex flex-col mt-[4rem] lg:mt-[6rem] xl:mt-[10rem] xl:justify-center gap-[50px]">

                    <h1 className="font-bold text-[36px] md:text-[46px] xl:text-[54px]">Alugue ou compre seu carro dos sonhos!</h1>
                    
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