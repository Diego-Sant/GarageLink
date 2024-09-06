import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Filter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState({
        disponibilidade: searchParams.get("disponibilidade") || "",
        cidade: searchParams.get("cidade") || "",
        marca: searchParams.get("marca") || "",
        condicao: searchParams.get("condicao") || "",
        transmissao: searchParams.get("transmissao") || "",
        cor: searchParams.get("cor") || "",
        precoMin: searchParams.get("precoMin") || 0,
        precoMax: searchParams.get("precoMax") || 100000000,
    });

    const handleChange = (e) => {
        setQuery({
            ...query,
            [e.target.name]: e.target.value
        })
    };

    const handleFilter = () => {
        setSearchParams(query);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleFilter();
        }
    };

    return (
        <div className="flex flex-col gap-[10px]">
            <h1 className="font-[300] text-[24px]">Resultado da pesquisa: <b className="font-bold capitalize">{searchParams.get("cidade")}</b></h1>
            <div className="">
                <div className="flex flex-col gap-4">
                    <label className="text-[14px]" htmlFor="cidade">Cidade</label>
                    <input onChange={handleChange} defaultValue={query.cidade}
                    className="w-[100%] p-[10px] border border-[#e0e0e0]" 
                    type="text" id="cidade" name="cidade" onKeyDown={handleKeyDown}
                    placeholder="Nome da cidade" />
                </div>
            </div>
            <div className="justify-between gap-[20px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
                <div className="flex flex-col gap-[2px]">
                    <label className="text-[14px]" htmlFor="marca">Marca</label>
                    <select onChange={handleChange} defaultValue={query.brand}
                        className="w-[100px] p-[10px] border border-[#e0e0e0] 
                        rounded-[5px] text-[14px]" name="marca" id="marca">
                        <option value="">Todas</option>
                        <option value="Audi">Audi</option>
                        <option value="Bentley">Bentley</option>
                        <option value="BMW">BMW</option>
                        <option value="BYD">BYD</option>
                        <option value="Chevrolet">Chevrolet</option>
                        <option value="Citroën">Citroën</option>
                        <option value="Ferrari">Ferrari</option>
                        <option value="Fiat">Fiat</option>
                        <option value="Ford">Ford</option>
                        <option value="Honda">Honda</option>
                        <option value="Hyundai">Hyundai</option>
                        <option value="Jaguar">Jaguar</option>
                        <option value="Jeep">Jeep</option>
                        <option value="Kia">Kia</option>
                        <option value="Lamborghini">Lamborghini</option>
                        <option value="Land Rover">Land Rover</option>
                        <option value="Maserati">Maserati</option>
                        <option value="McLaren">McLaren</option>
                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                        <option value="Mitsubishi">Mitsubishi</option>
                        <option value="Nissan">Nissan</option>
                        <option value="Peugeot">Peugeot</option>
                        <option value="Porsche">Porsche</option>
                        <option value="Renault">Renault</option>
                        <option value="Rolls Royce">Rolls Royce</option>
                        <option value="Suzuki">Suzuki</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Volkswagen">Volkswagen</option>
                        <option value="Yamaha">Yamaha</option>
                    </select>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <label className="text-[14px]" htmlFor="disponibilidade">Disponibilidade</label>
                    <select onChange={handleChange} defaultValue={query.disponibilidade}
                        className="w-[100px] p-[10px] border border-[#e0e0e0] 
                        rounded-[5px] text-[14px]" name="disponibilidade" 
                        id="disponibilidade">
                        <option value="">Todas</option>
                        <option value="Comprar">Comprar</option>
                        <option value="Alugar">Alugar</option>
                    </select>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <label className="text-[14px]" htmlFor="condicao">Condição</label>
                    <select onChange={handleChange} defaultValue={query.condicao}
                        className="w-[100px] p-[10px] border border-[#e0e0e0] 
                        rounded-[5px] text-[14px]" name="condicao" id="condicao">
                        <option value="">Todas</option>
                        <option value="Novo">Novo</option>
                        <option value="Usado">Usado</option>
                    </select>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <label className="text-[14px]" htmlFor="transmissao">Transmissão</label>
                    <select onChange={handleChange} defaultValue={query.transmissao}
                        className="w-[100px] p-[10px] border border-[#e0e0e0] 
                        rounded-[5px] text-[14px]" name="transmissao" id="transmissao">
                        <option value="">Todas</option>
                        <option value="Manual">Manual</option>
                        <option value="Automático">Automático</option>
                    </select>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <label className="text-[14px]" htmlFor="cor">Cor</label>
                    <select onChange={handleChange} defaultValue={query.cor}
                        className="w-[100px] p-[10px] border border-[#e0e0e0] 
                        rounded-[5px] text-[14px]" name="cor" id="cor">
                        <option value="">Todas</option>
                        <option value="Amarelo">Amarelo</option>
                        <option value="Azul">Azul</option>
                        <option value="Bege">Bege</option>
                        <option value="Bronze">Bronze</option>
                        <option value="Ciano">Ciano</option>
                        <option value="Cinza">Cinza</option>
                        <option value="Dourado">Dourado</option>
                        <option value="Laranja">Laranja</option>
                        <option value="Marrom">Marrom</option>
                        <option value="Prata">Prata</option>
                        <option value="Preto">Preto</option>
                        <option value="Púrpura">Púrpura</option>
                        <option value="Rosa">Rosa</option>
                        <option value="Roxo">Roxo</option>
                        <option value="Turquesa">Turquesa</option>
                        <option value="Vermelho">Vermelho</option>
                        <option value="Verde">Verde</option>
                    </select>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <label className="text-[14px]" htmlFor="precomin">Preço mínimo</label>
                    <input onChange={handleChange} defaultValue={query.precoMin}
                        className="w-[100px] p-[10px] border border-[#e0e0e0] 
                        rounded-[5px] text-[14px]" type="number" id="precomin" 
                        name="precomin" placeholder="Qualquer" onKeyDown={handleKeyDown} />
                </div>
                <div className="flex flex-col gap-[2px]">
                    <label className="text-[14px]" htmlFor="precomax">Preço máximo</label>
                    <input onChange={handleChange} defaultValue={query.precoMax}
                        className="w-[100px] p-[10px] border border-[#e0e0e0] 
                        rounded-[5px] text-[14px]" type="number" id="precomax" 
                        name="precomax" placeholder="Qualquer" onKeyDown={handleKeyDown} />
                </div>
                <button onClick={handleFilter} className="flex justify-center items-center w-[100px] h-[45px] mt-[1.11rem] border-0 cursor-pointer bg-[#fece51] hover:bg-[#fece51]/90 rounded-[5px]">
                    <img width={24} height={24} src="/search.svg" alt="Pesquisar" />
                </button>
            </div>
        </div>
    )
}

export default Filter;