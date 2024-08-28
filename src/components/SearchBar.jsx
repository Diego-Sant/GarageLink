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
                            ${query.type  === type ? "bg-black text-white" : ""}`}>
                        {type}
                    </button>
                ))}
                
            </div>
            <form className="flex justify-between border-[1px] border-[#999] h-[64px]">
                <input className="py-0 px-[10px] w-[200px]" type="text" name="local" placeholder="Nome da cidade" />
                <input className="py-0 px-[10px] w-[200px]" type="number" name="precomin" placeholder="Preço mínimo" />
                <input className="py-0 px-[10px] w-[200px]" type="number" name="precomax" placeholder="Preço máximo" />
            
                <button className="bg-black w-[50px]">
                    <img src="/search.svg" alt="Pesquisar" />
                </button>
            </form>
        </div>
    )
}

export default SearchBar;