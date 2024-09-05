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
    { name: 'Amarelo', value: 'yellow', hex1: '#FFFF00', hex2: '#FFEA00', hex3: '#FFF700'},
    { name: 'Azul', value: 'blue', hex1: '#0000FF', hex2: '#0096FF', hex3: '#00008B' },
    { name: 'Bege', value: 'beige', hex1: '#F5F5DC', hex2: '#EED9C4', hex3: '#EDC9AF' },
    { name: 'Bronze', value: 'bronze', hex1: '#CD7F32', hex2: '#B1560F', hex3: '#E4953C' },
    { name: 'Ciano', value: 'cyan', hex1: '#00FFFF', hex2: '#008B8B', hex3: '#7DF9FF' },
    { name: 'Cinza', value: 'gray', hex1: '#808080', hex2: '#D3D3D3', hex3: '#A9A9A9' },
    { name: 'Dourado', value: 'gold', hex1: '#FFD700', hex2: '#FFDF00', hex3: '#FFBF00' },
    { name: 'Laranja', value: 'orange', hex1: '#FFA500', hex2: '#F28500', hex3: '#FF7900' },
    { name: 'Marrom', value: 'brown', hex1: '#80461B', hex2: '#7B3F00', hex3: '#704214' },
    { name: 'Prata', value: 'silver', hex1: '#C0C0C0', hex2: '#AFB1AD', hex3: '#BCC1C2' },
    { name: 'Preto', value: 'black', hex1: '#000000', hex2: '#050301', hex3: '#060606' },
    { name: 'Púrpura', value: 'violet', hex1: '#EE82EE', hex2: '#8806CE', hex3: '#8F00FF' },
    { name: 'Rosa', value: 'pink', hex1: '#FFC0CB', hex2: '#FFB6C1', hex3: '#FF69B4' },
    { name: 'Roxo', value: 'purple', hex1: '#6A0DAD', hex2: '#800080', hex3: '#702670' },
    { name: 'Turquesa', value: 'turquoise', hex1: '#40E0D0', hex2: '#00CED1', hex3: '#00FFEF' },
    { name: 'Vermelho', value: 'red', hex1: '#FF0000', hex2: '#DC143C', hex3: '#FF2400' },
    { name: 'Verde', value: 'green', hex1: '#90EE90', hex2: '#006400', hex3: '#50C878' },
];

function NewPostPage() {
    const [buyOrRent, setBuyOrRent] = useState('buy');
    const [price, setPrice] = useState('');

    const [isTooltipVisibleLatitude, setIsTooltipVisibleLatitude] = useState(false);
    const [isTooltipVisibleLongitude, setIsTooltipVisibleLongitude] = useState(false);

    const handlePriceChange = (e) => {
        const onlyNumbers = e.target.value.replace(/\D/g, '');
        setPrice(onlyNumbers);
    };

    const handleTypeChange = (e) => {
        setBuyOrRent(e.target.value);
    };

    //------------------------------------------------------------------------------------------------//

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const [isColorOpen, setIsColorOpen] = useState(false);

    const brandDropdownRef = useRef(null);
    const colorDropdownRef = useRef(null);

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

    //------------------------------------------------------------------------------------------------//

    const [formValues, setFormValues] = useState({
        title: '', description: '', title1: '', desc1: '',
        title2: '', desc2: '', title3: '', desc3: ''
    });

    const [charCounts, setCharCounts] = useState({
        title: 0, description: 0, title1: 0, title2: 0, 
        title3: 0, desc1: 0, desc2: 0, desc3: 0
    });

    const [title1, setTitle1] = useState('');
    const [descr1, setDescr1] = useState(formValues.desc1);
    const [desc1Disabled, setDesc1Disabled] = useState(true);
    const [title2, setTitle2] = useState('');
    const [descr2, setDesc2] = useState(formValues.desc2);
    const [desc2Disabled, setDesc2Disabled] = useState(true);
    const [title3, setTitle3] = useState('');
    const [descr3, setDesc3] = useState(formValues.desc3);
    const [desc3Disabled, setDesc3Disabled] = useState(true);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'description' || name === 'title' || name === 'title1' || name === 'desc1' || name === 'title2' || name === 'desc2' || name === 'title3' || name === 'desc3') {
            setCharCounts(prev => ({
                ...prev,
                [name]: value.length
            }));
        }

        switch (name) {
            case 'title1':
                setTitle1(value);
                break;
            case 'desc1':
                setDescr1(value);
                break;
            case 'title2':
                setTitle2(value);
                break;
            case 'desc2':
                setDesc2(value);
                break;
            case 'title3':
                setTitle3(value);
                break;
            case 'desc3':
                setDesc3(value);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        setDesc1Disabled(title1.trim() === '');
        setDesc2Disabled(title2.trim() === '');
        setDesc3Disabled(title3.trim() === '');

        if (title1.trim() === '') {
            setDescr1('');
            setCharCounts(prev => ({
                ...prev,
                desc1: 0,
            }));
        }
        if (title2.trim() === '') {
            setDesc2('');
            setCharCounts(prev => ({
                ...prev,
                desc2: 0,
            }));
        }
        if (title3.trim() === '') {
            setDesc3('');
            setCharCounts(prev => ({
                ...prev,
                desc3: 0,
            }));
        }
    }, [title1, title2, title3]);

    useEffect(() => {
        setFormValues(prev => ({
            ...prev,
            desc1: descr1
        }));
        setFormValues(prev => ({
            ...prev,
            desc2: descr2
        }));
        setFormValues(prev => ({
            ...prev,
            desc3: descr3
        }));
    }, [descr1, descr2, descr3]);
  
    return (
        <div className="h-[100%] flex">
            <div className="flex-[3] overflow-y-auto">
                <h1 className="font-[500] text-[22px] md:text-[26px] mt-[30px]">Adicionar carro</h1>
                <div className="mt-[30px] md:mr-[50px] md:mb-[100px] ml-0">
                    <form className="flex md:justify-between flex-wrap gap-[20px] mb-10 md:mb-0">

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-[10px] items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="title">Nome e ano do carro</label>
                                    <span className="hidden lg:flex text-gray-600 text-sm">{charCounts.title}/30 caracteres</span>
                                </div>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <input className="p-[20px] rounded-[5px] border border-gray-400" 
                                id="title" name="title" type="text" value={formValues.title} placeholder="Ex: Ford Fiesta 2018"
                                onChange={handleInputChange} maxLength="30"
                            />
                            <span className="lg:hidden text-gray-600 text-sm">{charCounts.title}/30 caracteres</span>
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label className="text-[14px] sm:text-[16px]" htmlFor="buyorrent">Comprar ou alugar</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <select name="buyorrent" onChange={handleTypeChange}
                                className="p-[21px] rounded-[5px] border border-gray-400">
                                
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
                                <label className="text-[14px] sm:text-[16px]" htmlFor="price">
                                    {buyOrRent === 'rent' ? 'Valor do aluguel por hora' : 'Valor da compra'}
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
                                <label className="text-[14px] sm:text-[16px]" htmlFor="city">Cidade</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <input className="p-[20px] rounded-[5px] border border-gray-400" 
                                id="city" name="city" type="text" placeholder="Ex: São Paulo" 
                            />
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label className="text-[14px] sm:text-[16px]" htmlFor="address">Endereço completo</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <input className="p-[20px] rounded-[5px] border border-gray-400" 
                                id="address" name="address" type="text" placeholder="Ex: Guarulhos, SP - Brasil"
                            />
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label className="text-[14px] sm:text-[16px]" htmlFor="condition">Condição</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <select name="condition" className="p-[21px] rounded-[5px] 
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
                                <label className="text-[14px] sm:text-[16px]" htmlFor="brand">Marca</label>
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
                                <label className="text-[14px] sm:text-[16px]" htmlFor="transmission">Transmissão</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <select name="transmission" className="p-[21px] rounded-[5px] 
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
                                <label className="text-[14px] sm:text-[16px]" htmlFor="color">Cor</label>
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
                                                style={{ backgroundColor: color.hex1 }}
                                            />
                                            <div className="w-4 h-4 rounded-full mr-2"
                                                style={{ backgroundColor: color.hex2 }}
                                            />
                                            <div className="w-4 h-4 rounded-full mr-2"
                                                style={{ backgroundColor: color.hex3 }}
                                            />
                                            {color.name}
                                        </li>
                                    ))}
                                </ul>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-[5] w-[95%] md:w-[100%]">
                            <label className="text-[14px] sm:text-[16px]" htmlFor="description">Descrição</label>
                            <textarea className="p-[20px] rounded-[5px] border border-gray-400 h-[200px] resize-none" 
                                id="description" name="description" value={formValues.description} type="text"
                                onChange={handleInputChange} maxLength="750"
                            />
                            <span className="text-gray-600 text-sm">{charCounts.description}/750 caracteres</span>
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label className="text-[14px] sm:text-[16px]" htmlFor="fuel">Combustível</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <select name="fuel" className="p-[21px] rounded-[5px] 
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
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="latitude">Latitude</label>
                                    <div className="relative" onMouseEnter={() => setIsTooltipVisibleLatitude(true)}
                                        onMouseLeave={() => setIsTooltipVisibleLatitude(false)}>
                                        <img width={17} height={17} src="/info.svg" alt="" />
                                        {isTooltipVisibleLatitude && (
                                            <div className="absolute w-[100px] md:w-[200px] text-white bg-gray-800 border border-gray-400 p-2 rounded shadow-lg text-sm">
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
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="longitude">Longitude</label>
                                    <div className="relative" onMouseEnter={() => setIsTooltipVisibleLongitude(true)}
                                        onMouseLeave={() => setIsTooltipVisibleLongitude(false)}>
                                        <img width={17} height={17} src="/info.svg" alt="" />
                                        {isTooltipVisibleLongitude && (
                                            <div className="absolute w-[100px] md:w-[200px] text-white bg-gray-800 border border-gray-400 p-2 rounded shadow-lg text-sm">
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
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="title1">Título 1</label>
                                    <span className="text-gray-600 text-sm flex gap-[2px]">{charCounts.title1}/30 <span className="hidden sm:flex">caracteres</span></span>
                                </div>
                                <input className="p-[20px] rounded-[5px] border border-gray-400" 
                                    id="title1" name="title1" type="text" placeholder="Dê motivos para as pessoas comprarem o carro"
                                    onChange={handleInputChange} value={formValues.title1} maxLength="30"
                                />
                            </div>

                            <div className="w-[90%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="desc1">Descrição 1</label>
                                    <span className="text-gray-600 text-sm flex gap-[2px]">{charCounts.desc1}/30 <span className="hidden sm:flex">caracteres</span></span>
                                </div>
                                <input className="p-[20px] rounded-[5px] border border-gray-400 disabled:bg-gray-600/20" 
                                    id="desc1" name="desc1" type="text" placeholder="Adicione uma descrição sobre o título escolhido"
                                    disabled={desc1Disabled} onChange={handleInputChange} maxLength="30" value={formValues.desc1}
                                />
                            </div>

                            <div className="w-[90%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="title2">Título 2</label>
                                    <span className="text-gray-600 text-sm flex gap-[2px]">{charCounts.title2}/30 <span className="hidden sm:flex">caracteres</span></span>
                                </div>
                                <input className="p-[20px] rounded-[5px] border border-gray-400" 
                                    id="title2" name="title2" type="text" placeholder="Dê motivos para as pessoas comprarem o carro"
                                    onChange={handleInputChange} value={formValues.title2} maxLength="30"
                                />
                            </div>

                            <div className="w-[90%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="desc2">Descrição 2</label>
                                    <span className="text-gray-600 text-sm flex gap-[2px]">{charCounts.desc2}/30 <span className="hidden sm:flex">caracteres</span></span>
                                </div>
                                <input className="p-[20px] rounded-[5px] border border-gray-400 disabled:bg-gray-600/20" 
                                    id="desc2" name="desc2" type="text" placeholder="Adicione uma descrição sobre o título escolhido"
                                    disabled={desc2Disabled} onChange={handleInputChange} maxLength="30" value={formValues.desc2}
                                />
                            </div>

                            <div className="w-[90%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="title3">Título 3</label>
                                    <span className="text-gray-600 text-sm flex gap-[2px]">{charCounts.title3}/30 <span className="hidden sm:flex">caracteres</span></span>
                                </div>
                                <input className="p-[20px] rounded-[5px] border border-gray-400" 
                                    id="title3" name="title3" type="text" placeholder="Dê motivos para as pessoas comprarem o carro"
                                    onChange={handleInputChange} value={formValues.title3} maxLength="30"
                                />
                            </div>

                            <div className="w-[90%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="desc3">Descrição 3</label>
                                    <span className="text-gray-600 text-sm flex gap-[2px]">{charCounts.desc3}/30 <span className="hidden sm:flex">caracteres</span></span>
                                </div>
                                <input className="p-[20px] rounded-[5px] border border-gray-400 disabled:bg-gray-600/20" 
                                    id="desc3" name="desc3" type="text" placeholder="Adicione uma descrição sobre o título escolhido"
                                    disabled={desc3Disabled} onChange={handleInputChange} maxLength="30" value={formValues.desc3}
                                />
                            </div>
                        </div>

                        <button className="w-[95%] md:w-[100%] p-[20px] text-white font-semibold text-[22px] bg-[#fece51] uppercase hover:bg-[#fece51]/90 h-[100%] border-0 cursor-pointer rounded-[5px]">
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