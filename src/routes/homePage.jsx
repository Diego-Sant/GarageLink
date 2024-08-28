import SearchBar from "../components/SearchBar";

function HomePage() {
    return (
        <div className="flex h-[100%]">
            <div className="flex flex-[3]">
                <div className="pr-[100px] flex flex-col mt-10 xl:mt-0 xl:justify-center gap-[50px]">

                    <h1 className="font-bold text-[54px]">Alugue ou compre seu carro dos sonhos!</h1>
                    
                    <SearchBar />

                </div>
            </div>
            <div className="hidden relative xl:flex flex-[3] z-[100] items-center">
                <img className="absolute right-[0] w-[110%] lg:top-[4rem] xl:top-10 object-cover" src="/background.svg" alt="Imagem de carros e cenários" />
            </div>
        </div>
    )
}

export default HomePage;