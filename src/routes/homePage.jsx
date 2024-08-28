import SearchBar from "../components/SearchBar";

function HomePage() {
    return (
        <div className="flex h-[100%]">
            <div className="flex flex-[3]">
                <div className="pr-[100px] flex flex-col justify-center gap-[50px]">

                    <h1 className="font-bold text-[56px]">Alugue ou compre seu carro dos sonhos!</h1>
                    
                    <SearchBar />

                </div>
            </div>
            <div className="hidden relative lg:flex flex-[3] z-[100] items-center">
                <img className="absolute right-0 w-[100%] top-10" src="/background.svg" alt="" />
            </div>
        </div>
    )
}

export default HomePage;