function Filter() {
    return (
        <div className="flex flex-col gap-[10px]">
            <h1 className="font-[300] text-[24px]">Resultado da pesquisa: <b className="font-bold">Londres</b></h1>
            <div className="">
                <div className="flex flex-col gap-4">
                    <label className="text-[14px]" htmlFor="cidade">Local</label>
                    <input className="w-[100%] p-[10px] border border-[#e0e0e0]" type="text" id="cidade" name="cidade" placeholder="Nome da cidade" />
                </div>
            </div>
            <div className="justify-between gap-[20px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
                <div className="flex flex-col gap-[2px]">
                    <label className="text-[14px]" htmlFor="marca">Marca</label>
                    <select className="w-[100px] p-[10px] border border-[#e0e0e0] rounded-[5px] text-[14px]" name="marca" id="marca">
                        <option value="">Todas</option>
                        <option value="audi">Audi</option>
                        <option value="bentley">Bentley</option>
                        <option value="bmw">BMW</option>
                        <option value="byd">BYD</option>
                        <option value="chevrolet">Chevrolet</option>
                        <option value="citroen">Citroën</option>
                        <option value="ferrari">Ferrari</option>
                        <option value="fiat">Fiat</option>
                        <option value="ford">Ford</option>
                        <option value="honda">Honda</option>
                        <option value="hyundai">Hyundai</option>
                        <option value="jaguar">Jaguar</option>
                        <option value="jeep">Jeep</option>
                        <option value="kia">Kia</option>
                        <option value="lamborghini">Lamborghini</option>
                        <option value="landrover">Land Rover</option>
                        <option value="maserati">Maserati</option>
                        <option value="mclaren">McLaren</option>
                        <option value="mercedesbenz">Mercedes-Benz</option>
                        <option value="mitsubishi">Mitsubishi</option>
                        <option value="nissan">Nissan</option>
                        <option value="peugeot">Peugeot</option>
                        <option value="porsche">Porsche</option>
                        <option value="renault">Renault</option>
                        <option value="rollsroyce">Rolls Royce</option>
                        <option value="suzuki">Suzuki</option>
                        <option value="toyota">Toyota</option>
                        <option value="volkswagen">Volkswagen</option>
                        <option value="yamaha">Yamaha</option>
                    </select>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <label className="text-[14px]" htmlFor="disponibilidade">Disponibilidade</label>
                    <select className="w-[100px] p-[10px] border border-[#e0e0e0] rounded-[5px] text-[14px]" name="disponibilidade" id="disponibilidade">
                        <option value="">Todas</option>
                        <option value="comprar">Comprar</option>
                        <option value="alugar">Alugar</option>
                    </select>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <label className="text-[14px]" htmlFor="condicao">Condição</label>
                    <select className="w-[100px] p-[10px] border border-[#e0e0e0] rounded-[5px] text-[14px]" name="condicao" id="condicao">
                        <option value="">Todas</option>
                        <option value="usado">Novo</option>
                        <option value="novo">Usado</option>
                    </select>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <label className="text-[14px]" htmlFor="transmissao">Transmissão</label>
                    <select className="w-[100px] p-[10px] border border-[#e0e0e0] rounded-[5px] text-[14px]" name="transmissao" id="transmissao">
                        <option value="">Todas</option>
                        <option value="manual">Manual</option>
                        <option value="automatico">Automático</option>
                    </select>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <label className="text-[14px]" htmlFor="cor">Cor</label>
                    <select className="w-[100px] p-[10px] border border-[#e0e0e0] rounded-[5px] text-[14px]" name="cor" id="cor">
                        <option value="">Todas</option>
                        <option value="amarelo">Amarelo</option>
                        <option value="azul">Azul</option>
                        <option value="bege">Bege</option>
                        <option value="bronze">Bronze</option>
                        <option value="ciano">Ciano</option>
                        <option value="cinza">Cinza</option>
                        <option value="dourado">Dourado</option>
                        <option value="laranja">Laranja</option>
                        <option value="marrom">Marrom</option>
                        <option value="prata">Prata</option>
                        <option value="preto">Preto</option>
                        <option value="purpura">Púrpura</option>
                        <option value="rosa">Rosa</option>
                        <option value="roxo">Roxo</option>
                        <option value="turquesa">Turquesa</option>
                        <option value="vermelho">Vermelho</option>
                        <option value="verde">Verde</option>
                    </select>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <label className="text-[14px]" htmlFor="precomin">Preço mínimo</label>
                    <input className="w-[100px] p-[10px] border border-[#e0e0e0] rounded-[5px] text-[14px]" type="number" id="precomin" name="precomin" placeholder="Qualquer" />
                </div>
                <div className="flex flex-col gap-[2px]">
                    <label className="text-[14px]" htmlFor="precomax">Preço máximo</label>
                    <input className="w-[100px] p-[10px] border border-[#e0e0e0] rounded-[5px] text-[14px]" type="number" id="precomax" name="precomax" placeholder="Qualquer" />
                </div>
                <button className="flex justify-center items-center w-[100px] h-[45px] mt-[1.11rem] border-0 cursor-pointer bg-[#fece51] hover:bg-[#fece51]/90 rounded-[5px]">
                    <img width={24} height={24} src="/search.svg" alt="Pesquisar" />
                </button>
            </div>
        </div>
    )
}

export default Filter;