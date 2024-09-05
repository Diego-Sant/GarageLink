import { useEffect, useRef, useState } from "react";

const brands = [
    { name: 'Audi', value: 'audi', logo: 'https://diego-sant.github.io/QuizApp/img/audi.svg' },
    { name: 'Bentley', value: 'bentley', logo: 'https://diego-sant.github.io/QuizApp/img/bentley.svg' },
    { name: 'BMW', value: 'bmw', logo: 'https://diego-sant.github.io/QuizApp/img/bmw.svg' },
    { name: 'BYD', value: 'byd', logo: 'https://diego-sant.github.io/QuizApp/img/byd.svg' },
    { name: 'Chevrolet', value: 'chevrolet', logo: 'https://diego-sant.github.io/QuizApp/img/chevrolet.svg' },
    { name: 'Citroën', value: 'citroen', logo: 'https://diego-sant.github.io/QuizApp/img/citroen.svg' },
    { name: 'Ferrari', value: 'ferrari', logo: 'https://diego-sant.github.io/QuizApp/img/ferrari.svg' },
    { name: 'Fiat', value: 'fiat', logo: 'https://diego-sant.github.io/QuizApp/img/fiat.svg' },
    { name: 'Ford', value: 'ford', logo: 'https://diego-sant.github.io/QuizApp/img/ford.svg' },
    { name: 'Honda', value: 'honda', logo: 'https://diego-sant.github.io/QuizApp/img/honda.svg' },
    { name: 'Hyundai', value: 'hyundai', logo: 'https://diego-sant.github.io/QuizApp/img/hyundai.svg' },
    { name: 'Jaguar', value: 'jaguar', logo: 'https://diego-sant.github.io/QuizApp/img/jaguar.svg' },
    { name: 'Jeep', value: 'jeep', logo: 'https://diego-sant.github.io/QuizApp/img/jeep.svg' },
    { name: 'Kia', value: 'kia', logo: 'https://diego-sant.github.io/QuizApp/img/kia.svg' },
    { name: 'Lamborghini', value: 'lamborghini', logo: 'https://diego-sant.github.io/QuizApp/img/lamborghini.svg' },
    { name: 'Land Rover', value: 'landrover', logo: 'https://diego-sant.github.io/QuizApp/img/landrover.svg' },
    { name: 'Maserati', value: 'maserati', logo: 'https://diego-sant.github.io/QuizApp/img/maserati.svg' },
    { name: 'McLaren', value: 'mclaren', logo: 'https://diego-sant.github.io/QuizApp/img/mclaren.svg' },
    { name: 'Mercedes-Benz', value: 'mercedes', logo: 'https://diego-sant.github.io/QuizApp/img/mercedes.svg' },
    { name: 'Mitsubishi', value: 'mitsubishi', logo: 'https://diego-sant.github.io/QuizApp/img/mitsubishi.svg' },
    { name: 'Nissan', value: 'nissan', logo: 'https://diego-sant.github.io/QuizApp/img/nissan.svg' },
    { name: 'Peugeot', value: 'peugeot', logo: 'https://diego-sant.github.io/QuizApp/img/peugeot.svg' },
    { name: 'Porsche', value: 'porsche', logo: 'https://diego-sant.github.io/QuizApp/img/porsche.svg' },
    { name: 'Renault', value: 'renault', logo: 'https://diego-sant.github.io/QuizApp/img/renault.svg' },
    { name: 'Rolls Royce', value: 'rollsroyce', logo: 'https://diego-sant.github.io/QuizApp/img/rollsroyce.svg' },
    { name: 'Suzuki', value: 'suzuki', logo: 'https://diego-sant.github.io/QuizApp/img/suzuki.svg' },
    { name: 'Toyota', value: 'toyota', logo: 'https://diego-sant.github.io/QuizApp/img/toyota.svg' },
    { name: 'Volkswagen', value: 'volkswagen', logo: 'https://diego-sant.github.io/QuizApp/img/volkswagen.svg' },
    { name: 'Yamaha', value: 'yamaha', logo: 'https://diego-sant.github.io/QuizApp/img/yamaha.svg' },
];

const colors = [
    { name: 'Amarelo', value: 'yellow', hex: '#FECE51' },
    { name: 'Azul', value: 'blue', hex: '#0000FF' },
    { name: 'Bege', value: 'beige', hex: '#F5F5DC' },
    { name: 'Bronze', value: 'bronze', hex: '#CD7F32' },
    { name: 'Ciano', value: 'cyan', hex: '#00FFFF' },
    { name: 'Cinza', value: 'gray', hex: '#808080' },
    { name: 'Dourado', value: 'gold', hex: '#FFD700' },
    { name: 'Laranja', value: 'orange', hex: '#FFA500' },
    { name: 'Marrom', value: 'brown', hex: '#A52A2A' },
    { name: 'Prata', value: 'silver', hex: '#C0C0C0' },
    { name: 'Preto', value: 'black', hex: '#000000' },
    { name: 'Púrpura', value: 'violet', hex: '#800080' },
    { name: 'Rosa', value: 'pink', hex: '#FFC0CB' },
    { name: 'Roxo', value: 'purple', hex: '#6A0DAD' },
    { name: 'Turquesa', value: 'turquoise', hex: '#40E0D0' },
    { name: 'Vermelho', value: 'red', hex: '#FF0000' },
    { name: 'Verde', value: 'green', hex: '#008000' },
];

function NewPostPage() {
    const [buyOrRent, setBuyOrRent] = useState('buy');
    const [price, setPrice] = useState('');

    const [isTooltipVisibleLatitude, setIsTooltipVisibleLatitude] = useState(false);
    const [isTooltipVisibleLongitude, setIsTooltipVisibleLongitude] = useState(false);

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const [isColorOpen, setIsColorOpen] = useState(false);

    const [title1, setTitle1] = useState('');
    const [desc1, setDesc1] = useState('');
    const [desc1Disabled, setDesc1Disabled] = useState(true);
    const [title2, setTitle2] = useState('');
    const [desc2, setDesc2] = useState('');
    const [desc2Disabled, setDesc2Disabled] = useState(true);
    const [title3, setTitle3] = useState('');
    const [desc3, setDesc3] = useState('');
    const [desc3Disabled, setDesc3Disabled] = useState(true);

    const brandDropdownRef = useRef(null);
    const colorDropdownRef = useRef(null);

    const handlePriceChange = (e) => {
        const onlyNumbers = e.target.value.replace(/\D/g, '');
        setPrice(onlyNumbers);
    };


    const handleTypeChange = (e) => {
        setBuyOrRent(e.target.value);
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        setIsColorOpen(false);
    };

    const handleBrandSelect = (brand) => {
        setSelectedBrand(brand);
        setIsBrandOpen(false);
    };

    const toggleBrandDropdown = () => {
        setIsBrandOpen(!isBrandOpen);
        setIsColorOpen(false);
    };

    const toggleColorDropdown = () => {
        setIsColorOpen(!isColorOpen);
        setIsBrandOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (brandDropdownRef.current && !brandDropdownRef.current.contains(event.target)) {
                setIsBrandOpen(false);
            }
            if (colorDropdownRef.current && !colorDropdownRef.current.contains(event.target)) {
                setIsColorOpen(false);
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsBrandOpen(false);
                setIsColorOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        setDesc1Disabled(title1.trim() === '');
        setDesc2Disabled(title2.trim() === '');
        setDesc3Disabled(title3.trim() === '');

        if (title1.trim() === '') {
            setDesc1('');
        }
        if (title2.trim() === '') {
            setDesc2('');
        }
        if (title3.trim() === '') {
            setDesc3('');
        }
    }, [title1, title2, title3]);
  
    return (
        <div className="h-[100%] flex">
            <div className="flex-[3] overflow-y-auto">
                <h1 className="font-[500] text-[22px] md:text-[26px] mt-[30px]">Adicionar carro</h1>
                <div className="mt-[30px] md:mr-[50px] md:mb-[100px] ml-0">
                    <form className="flex md:justify-between flex-wrap gap-[20px] mb-10 md:mb-0">

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label htmlFor="title">Nome e ano do carro</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <input className="p-[20px] rounded-[5px] border border-gray-400" 
                                id="title" name="title" type="text" placeholder="Ex: Ford Fiesta 2018"
                            />
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label htmlFor="buyorrent">Comprar ou alugar</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <select name="buyorrent" onChange={handleTypeChange}
                                className="p-[20px] rounded-[5px] border border-gray-400">
                                
                                <option value="buy" defaultChecked>
                                    Comprar
                                </option>
                                <option value="rent">
                                    Alugar
                                </option>

                            </select>
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label htmlFor="price">
                                    {buyOrRent === 'rent' ? 'Valor do aluguel' : 'Valor da compra'}
                                </label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            
                            <input className="p-[20px] rounded-[5px] border border-gray-400" 
                                id="price" name="price" type="text" value={price} onChange={handlePriceChange}
                                placeholder={buyOrRent === 'rent' ? 'Ex: 120' : 'Ex: 120000'} 
                            />
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label htmlFor="city">Cidade</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <input className="p-[20px] rounded-[5px] border border-gray-400" 
                                id="city" name="city" type="text" placeholder="Ex: São Paulo" 
                            />
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label htmlFor="address">Endereço completo</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <input className="p-[20px] rounded-[5px] border border-gray-400" 
                                id="address" name="address" type="text" placeholder="Ex: Guarulhos, SP - Brasil"
                            />
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label htmlFor="condition">Condição</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <select name="condition" className="p-[20px] rounded-[5px] 
                                border border-gray-400">
                                    
                                <option value="new" defaultChecked>
                                    Novo
                                </option>
                                <option value="used">
                                    Usado
                                </option>
                                
                            </select>
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label htmlFor="brand">Marca</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <div className="relative" ref={brandDropdownRef}>
                                
                                <button
                                    type="button"
                                    onClick={toggleBrandDropdown}
                                    className="p-[20px] rounded-[5px] border border-gray-400 w-full flex items-center justify-between"
                                >
                                    <span className="flex truncate max-[10px]">{selectedBrand || 'Selecione a marca'}</span>
                                    <img className="absolute right-2" width={10} height={10} src="/arrow2.svg" alt="Seta" />
                                </button>

                                {isBrandOpen && (
                                <ul name="brand" className="absolute top-full left-0 w-full bg-white
                                    border border-gray-400 mt-[0.05rem] z-10 rounded-[10px]">
                                    {brands.map((brand) => (
                                        <li key={brand.value} className="flex items-center p-2 
                                            cursor-pointer hover:bg-gray-200 rounded-[10px]" 
                                            onClick={() => handleBrandSelect(brand.name)} value={brand.value}>
                                                
                                            <img src={brand.logo} alt={`Logo ${brand.name}`} className="w-6 h-6 mr-2" />
                                            {brand.name}

                                        </li>
                                    ))}
                                </ul>
                                )}
                            </div>
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label htmlFor="transmission">Transmissão</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <select name="transmission" className="p-[20px] rounded-[5px] 
                                border border-gray-400">
                                    
                                <option value="manual" defaultChecked>
                                    Manual
                                </option>
                                <option value="auto">
                                    Automático
                                </option>
                                
                            </select>
                        </div>

                        <div className="w-[95%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label htmlFor="color">Cor</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <div className="relative" ref={colorDropdownRef}>
                                <button
                                    type="button"
                                    onClick={toggleColorDropdown}
                                    className="p-[20px] rounded-[5px] border border-gray-400 w-full flex items-center justify-between"
                                >
                                    <span className="flex truncate max-[10px]">{selectedColor || 'Selecione a cor principal'}</span>
                                    <img className="absolute right-2" width={10} height={10} src="/arrow2.svg" alt="Seta" />
                                </button>
                                {isColorOpen && (
                                <ul name="color" className="absolute top-full left-0 w-full bg-white
                                    border border-gray-400 mt-[0.05rem] z-10 rounded-[10px]">
                                    {colors.map((color) => (
                                        <li key={color.value} className="flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded-[10px]" 
                                            onClick={() => handleColorSelect(color.name)} value={color.value}>
                                            <div className="w-4 h-4 rounded-full mr-2"
                                                style={{ backgroundColor: color.hex }}
                                            />
                                            {color.name}
                                        </li>
                                    ))}
                                </ul>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-[5] w-[100%] h-[320px] ">
                            <label htmlFor="description">Descrição</label>
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label htmlFor="fuel">Combustível</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <select name="fuel" className="p-[20px] rounded-[5px] 
                                border border-gray-400">
                                    
                                <option value="diesel" defaultChecked>
                                    Diesel
                                </option>
                                <option value="elec">
                                    Eletrecidade
                                </option>
                                <option value="etanol">
                                    Etanol
                                </option>
                                <option value="flex">
                                    Flex
                                </option>
                                <option value="gas">
                                    Gás
                                </option>
                                <option value="gasolina">
                                    Gasolina
                                </option>
                                
                            </select>
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-[5px] items-center">
                                    <label htmlFor="latitude">Latitude</label>
                                    <div className="relative" onMouseEnter={() => setIsTooltipVisibleLatitude(true)}
                                        onMouseLeave={() => setIsTooltipVisibleLatitude(false)}>
                                        <img width={17} height={17} src="/info.svg" alt="" />
                                        {isTooltipVisibleLatitude && (
                                            <div className="absolute w-[200px] text-white bg-gray-800 border border-gray-400 p-2 rounded shadow-lg text-sm">
                                                Veja no Google Maps para uma resposta precisa.
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <input className="p-[20px] rounded-[5px] border border-gray-400" 
                                id="latitude" name="latitude" type="number" placeholder="Ex: -23.59105941675351"
                            />
                        </div>

                        <div className="w-[95%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-[5px] items-center">
                                    <label htmlFor="longitude">Longitude</label>
                                    <div className="relative" onMouseEnter={() => setIsTooltipVisibleLongitude(true)}
                                        onMouseLeave={() => setIsTooltipVisibleLongitude(false)}>
                                        <img width={17} height={17} src="/info.svg" alt="" />
                                        {isTooltipVisibleLongitude && (
                                            <div className="absolute w-[200px] text-white bg-gray-800 border border-gray-400 p-2 rounded shadow-lg text-sm">
                                                Veja no Google Maps para uma resposta precisa.
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <input className="p-[20px] rounded-[5px] border border-gray-400" 
                                id="longitude" name="longitude" type="number" placeholder="Ex: -46.69087039560111"
                            />
                        </div>

                        <div className="grid grid-cols-2 w-[100%] gap-[20px]">
                            <div className="w-[90%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label htmlFor="title1">Título 1</label>
                                </div>
                                <input className="p-[20px] rounded-[5px] border border-gray-400" 
                                    id="title1" name="title1" type="text" placeholder="Dê motivos para as pessoas comprarem o carro"
                                    onChange={(e) => setTitle1(e.target.value)} value={title1}
                                />
                            </div>

                            <div className="w-[90%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label htmlFor="desc1">Descrição 1</label>
                                </div>
                                <input className="p-[20px] rounded-[5px] border border-gray-400 disabled:bg-gray-600/20" 
                                    id="desc1" name="desc1" type="text" placeholder="Adicione uma descrição sobre o título escolhido"
                                    disabled={desc1Disabled} onChange={(e) => setDesc1(e.target.value)} value={desc1}
                                />
                            </div>

                            <div className="w-[90%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label htmlFor="title2">Título 2</label>
                                </div>
                                <input className="p-[20px] rounded-[5px] border border-gray-400" 
                                    id="title2" name="title2" type="text" placeholder="Dê motivos para as pessoas comprarem o carro"
                                    onChange={(e) => setTitle2(e.target.value)} value={title2}
                                />
                            </div>

                            <div className="w-[90%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label htmlFor="desc2">Descrição 2</label>
                                </div>
                                <input className="p-[20px] rounded-[5px] border border-gray-400 disabled:bg-gray-600/20" 
                                    id="desc2" name="desc2" type="text" placeholder="Adicione uma descrição sobre o título escolhido"
                                    disabled={desc2Disabled} onChange={(e) => setDesc2(e.target.value)} value={desc2}
                                />
                            </div>

                            <div className="w-[90%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label htmlFor="title3">Título 3</label>
                                </div>
                                <input className="p-[20px] rounded-[5px] border border-gray-400" 
                                    id="title3" name="title3" type="text" placeholder="Dê motivos para as pessoas comprarem o carro"
                                    onChange={(e) => setTitle3(e.target.value)} value={title3}
                                />
                            </div>

                            <div className="w-[90%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label htmlFor="desc3">Descrição 3</label>
                                </div>
                                <input className="p-[20px] rounded-[5px] border border-gray-400 disabled:bg-gray-600/20" 
                                    id="desc3" name="desc3" type="text" placeholder="Adicione uma descrição sobre o título escolhido"
                                    disabled={desc3Disabled} onChange={(e) => setDesc3(e.target.value)} value={desc3}
                                />
                            </div>
                        </div>

                        <button className="w-[100%] p-[20px] text-white font-semibold text-[26px] bg-[#fece51] uppercase hover:bg-[#fece51]/90 h-[100%] border-0 cursor-pointer rounded-[5px]">
                            Publicar carro
                        </button>
                    </form>
                </div>
            </div>
            <div className="sideContainer"></div>
        </div>
  );
}

export default NewPostPage;