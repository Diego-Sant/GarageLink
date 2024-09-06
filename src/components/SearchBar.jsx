import { useState } from "react";
import { Link } from "react-router-dom";

const types = ["Comprar", "Alugar"];

function SearchBar() {
    const [query, setQuery] = useState({
        disponibilidade: "Comprar",
        cidade: "",
        precoMin: 0,
        precoMax: 0,
    });

    const switchType = (val) => {
        setQuery(prev => ({...prev, disponibilidade:val}));
    };

    const handleChange = (e) => {
        setQuery(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    return (
        <div>
            <div className="flex">

                {types.map((type) => (
                    <button key={type} onClick={() => switchType(type)} 
                        className={`py-[16px] px-[36px] border-[1px] border-[#999] border-b-0 cursor-pointer capitalize 
                            first-of-type:rounded-tl-md first-of-type:border-r-0 last-of-type:rounded-tr-md last-of-type:border-l-0
                            ${query.disponibilidade  === type ? "bg-black hover:bg-black/90 text-white" : ""}`}>
                        {type}
                    </button>
                ))}
                
            </div>
            <form className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row justify-between md:border-[1px] md:border-[#999] h-[64px]">
                
                <input onChange={handleChange} name="cidade"
                    className="border md:border-0 p-[20px] md:py-0 md:px-[5px] 
                    w-auto md:w-[215px] lg:w-[258px] xl:w-[185px] 2xl:w-[200px] 
                    xl:px-[10px]" type="text" placeholder="Nome da cidade"
                />

                <input onChange={handleChange} name="precoMin"
                    className="border md:border-0 p-[20px] md:py-0 md:px-[5px] 
                    w-auto md:w-[215px] lg:w-[258px] xl:w-[185px] 2xl:w-[200px] 
                    xl:px-[10px]" type="number" placeholder="Preço mínimo" 
                />

                <input onChange={handleChange} name="precoMax" 
                    className="border md:border-0 p-[20px] md:py-0 md:px-[5px] 
                    w-auto md:w-[215px] lg:w-[258px] xl:w-[185px] 2xl:w-[200px] 
                    xl:px-[10px]" type="number" placeholder="Preço máximo" 
                />

                <Link className="bg-[#fece51] hover:bg-[#fece51]/90 p-[20px] md:p-0 w-auto md:w-[65px] border-0 cursor-pointer xl:flex-1 flex justify-center items-center" to={`/carros?disponibilidade=${query.disponibilidade}&cidade=${query.cidade}&precoMin=${query.precoMin}&precoMax=${query.precoMax}`}>
                    <button>
                        <img className="transition duration-[0.4s] ease-in-out hover:scale-[1.1]" width={24} height={24} src="/search.svg" alt="Pesquisar" />
                    </button>
                </Link>
                
            </form>
        </div>
    )
}

export default SearchBar;