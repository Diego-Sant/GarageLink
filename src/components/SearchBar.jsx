import { useState } from "react";

const types = ["comprar", "alugar"];

function SearchBar() {
    const [query, setQuery] = useState({
        type: "comprar",
        local: "",
        precomin: 0,
        precomax: 0,
    });

    const switchType = (val) => {
        setQuery(prev => ({...prev, type:val}));
    }

    return (
        <div className="">
            <div className="flex">

                {types.map((type) => (
                    <button key={type} onClick={() => switchType(type)} 
                        className={`py-[16px] px-[36px] border-[1px] border-[#999] border-b-0 cursor-pointer capitalize 
                            first-of-type:rounded-tl-md first-of-type:border-r-0 last-of-type:rounded-tr-md last-of-type:border-l-0
                            ${query.type  === type ? "bg-black hover:bg-black/90 text-white" : ""}`}>
                        {type}
                    </button>
                ))}
                
            </div>
            <form className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row justify-between md:border-[1px] md:border-[#999] h-[64px]">
                <input className="border md:border-0 p-[20px] md:py-0 md:px-[5px] w-auto md:w-[215px] lg:w-[258px] xl:w-[185px] 2xl:w-[200px] xl:px-[10px]" type="text" name="local" placeholder="Nome da cidade" />
                <input className="border md:border-0 p-[20px] md:py-0 md:px-[5px] w-auto md:w-[215px] lg:w-[258px] xl:w-[185px] 2xl:w-[200px] xl:px-[10px]" type="number" name="precomin" placeholder="Preço mínimo" />
                <input className="border md:border-0 p-[20px] md:py-0 md:px-[5px] w-auto md:w-[215px] lg:w-[258px] xl:w-[185px] 2xl:w-[200px] xl:px-[10px]" type="number" name="precomax" placeholder="Preço máximo" />
            
                <button className="bg-[#fece51] hover:bg-[#fece51]/90 p-[20px] md:p-0 w-auto md:w-[65px] border-0 cursor-pointer xl:flex-1 flex justify-center items-center">
                    <img className="transition duration-[0.4s] ease-in-out hover:scale-[1.1]" width={24} height={24} src="/search.svg" alt="Pesquisar" />
                </button>
            </form>
        </div>
    )
}

export default SearchBar;