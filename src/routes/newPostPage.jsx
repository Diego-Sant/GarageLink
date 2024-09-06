import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import apiRequest from "../lib/apiRequest";
import UploadCarWidget from "../components/uploadCarWidget";

const brands = [
    { name: 'Audi', value: 'Audi', logo: 'https://diego-sant.github.io/QuizApp/img/audi.svg' },
    { name: 'Bentley', value: 'Bentley', logo: 'https://diego-sant.github.io/QuizApp/img/bentley.svg' },
    { name: 'BMW', value: 'BMW', logo: 'https://diego-sant.github.io/QuizApp/img/bmw.svg' },
    { name: 'BYD', value: 'BYD', logo: 'https://diego-sant.github.io/QuizApp/img/byd.svg' },
    { name: 'Chevrolet', value: 'Chevrolet', logo: 'https://diego-sant.github.io/QuizApp/img/chevrolet.svg' },
    { name: 'Citroën', value: 'Citroen', logo: 'https://diego-sant.github.io/QuizApp/img/citroen.svg' },
    { name: 'Ferrari', value: 'Ferrari', logo: 'https://diego-sant.github.io/QuizApp/img/ferrari.svg' },
    { name: 'Fiat', value: 'Fiat', logo: 'https://diego-sant.github.io/QuizApp/img/fiat.svg' },
    { name: 'Ford', value: 'Ford', logo: 'https://diego-sant.github.io/QuizApp/img/ford.svg' },
    { name: 'Honda', value: 'Honda', logo: 'https://diego-sant.github.io/QuizApp/img/honda.svg' },
    { name: 'Hyundai', value: 'Hyundai', logo: 'https://diego-sant.github.io/QuizApp/img/hyundai.svg' },
    { name: 'Jaguar', value: 'Jaguar', logo: 'https://diego-sant.github.io/QuizApp/img/jaguar.svg' },
    { name: 'Jeep', value: 'Jeep', logo: 'https://diego-sant.github.io/QuizApp/img/jeep.svg' },
    { name: 'Kia', value: 'Kia', logo: 'https://diego-sant.github.io/QuizApp/img/kia.svg' },
    { name: 'Lamborghini', value: 'Lamborghini', logo: 'https://diego-sant.github.io/QuizApp/img/lamborghini.svg' },
    { name: 'Land Rover', value: 'LandRover', logo: 'https://diego-sant.github.io/QuizApp/img/landrover.svg' },
    { name: 'Maserati', value: 'Maserati', logo: 'https://diego-sant.github.io/QuizApp/img/maserati.svg' },
    { name: 'McLaren', value: 'McLaren', logo: 'https://diego-sant.github.io/QuizApp/img/mclaren.svg' },
    { name: 'Mercedes-Benz', value: 'MercedesBenz', logo: 'https://diego-sant.github.io/QuizApp/img/mercedes.svg' },
    { name: 'Mitsubishi', value: 'Mitsubishi', logo: 'https://diego-sant.github.io/QuizApp/img/mitsubishi.svg' },
    { name: 'Nissan', value: 'Nissan', logo: 'https://diego-sant.github.io/QuizApp/img/nissan.svg' },
    { name: 'Peugeot', value: 'Peugeot', logo: 'https://diego-sant.github.io/QuizApp/img/peugeot.svg' },
    { name: 'Porsche', value: 'Porsche', logo: 'https://diego-sant.github.io/QuizApp/img/porsche.svg' },
    { name: 'Renault', value: 'Renault', logo: 'https://diego-sant.github.io/QuizApp/img/renault.svg' },
    { name: 'Rolls Royce', value: 'RollsRoyce', logo: 'https://diego-sant.github.io/QuizApp/img/rollsroyce.svg' },
    { name: 'Suzuki', value: 'Suzuki', logo: 'https://diego-sant.github.io/QuizApp/img/suzuki.svg' },
    { name: 'Toyota', value: 'Toyota', logo: 'https://diego-sant.github.io/QuizApp/img/toyota.svg' },
    { name: 'Volkswagen', value: 'Volkswagen', logo: 'https://diego-sant.github.io/QuizApp/img/volkswagen.svg' },
    { name: 'Yamaha', value: 'Yamaha', logo: 'https://diego-sant.github.io/QuizApp/img/yamaha.svg' },
];

const colors = [
    { name: 'Amarelo', value: 'Amarelo', hex1: '#FFFF00', hex2: '#FFEA00', hex3: '#FFF700'},
    { name: 'Azul', value: 'Azul', hex1: '#0000FF', hex2: '#0096FF', hex3: '#00008B' },
    { name: 'Bege', value: 'Bege', hex1: '#F5F5DC', hex2: '#EED9C4', hex3: '#EDC9AF' },
    { name: 'Bronze', value: 'Bronze', hex1: '#CD7F32', hex2: '#B1560F', hex3: '#E4953C' },
    { name: 'Ciano', value: 'Ciano', hex1: '#00FFFF', hex2: '#008B8B', hex3: '#7DF9FF' },
    { name: 'Cinza', value: 'Cinza', hex1: '#808080', hex2: '#D3D3D3', hex3: '#A9A9A9' },
    { name: 'Dourado', value: 'Dourado', hex1: '#FFD700', hex2: '#FFDF00', hex3: '#FFBF00' },
    { name: 'Laranja', value: 'Laranja', hex1: '#FFA500', hex2: '#F28500', hex3: '#FF7900' },
    { name: 'Marrom', value: 'Marrom', hex1: '#80461B', hex2: '#7B3F00', hex3: '#704214' },
    { name: 'Prata', value: 'Prata', hex1: '#C0C0C0', hex2: '#AFB1AD', hex3: '#BCC1C2' },
    { name: 'Preto', value: 'Preto', hex1: '#000000', hex2: '#050301', hex3: '#060606' },
    { name: 'Púrpura', value: 'Purpura', hex1: '#EE82EE', hex2: '#8806CE', hex3: '#8F00FF' },
    { name: 'Rosa', value: 'Rosa', hex1: '#FFC0CB', hex2: '#FFB6C1', hex3: '#FF69B4' },
    { name: 'Roxo', value: 'Roxo', hex1: '#6A0DAD', hex2: '#800080', hex3: '#702670' },
    { name: 'Turquesa', value: 'Turquesa', hex1: '#40E0D0', hex2: '#00CED1', hex3: '#00FFEF' },
    { name: 'Vermelho', value: 'Vermelho', hex1: '#FF0000', hex2: '#DC143C', hex3: '#FF2400' },
    { name: 'Verde', value: 'Verde', hex1: '#90EE90', hex2: '#006400', hex3: '#50C878' },
];

function NewPostPage() {
    const [buyOrRent, setBuyOrRent] = useState('buy');
    const [error, setError] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);

    const navigate = useNavigate();

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const [isTooltipVisibleLatitude, setIsTooltipVisibleLatitude] = useState(false);
    const [isTooltipVisibleLongitude, setIsTooltipVisibleLongitude] = useState(false);

    const handlePriceChange = (e) => {
        const onlyNumbers = e.target.value.replace(/\D/g, '');
        setPrice(onlyNumbers);
    };

    const handleTypeChange = (e) => {
        setBuyOrRent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);

        if (images.length > 4) {
            setError('Você pode adicionar no máximo 4 imagens.');
            return;
        }

        if (!inputs.title) {
            setError('O nome e ano do carro são obrigatórios!');
            return;
        }

        if (!inputs.priceToBuy && !inputs.priceToRent) {
            setError('O valor de compra/aluguel é obrigatório!');
            return;
        }

        if (!inputs.city) {
            setError('A cidade é obrigatória!');
            return;
        }

        if (!inputs.address) {
            setError('O endereço é obrigatório!');
            return;
        }

        if (!inputs.brand) {
            setError('A marca é obrigatória!');
            return;
        }

        if (!inputs.color) {
            setError('A cor é obrigatória!');
            return;
        }

        if (!inputs.description) {
            setError('A descrição é obrigatória!');
            return;
        }

        if (!inputs.latitude) {
            setError('A latitude é obrigatória! Use o Google Maps para ter a precisão exata.');
            return;
        }

        if (!inputs.longitude) {
            setError('A longitude é obrigatória! Use o Google Maps para ter a precisão exata.');
            return;
        }

        setError('');

        try {
            const res = await apiRequest.post("/publicacoes", {
                postData: {
                    title: inputs.title,
                    city: inputs.city,
                    address: inputs.address,
                    condition: inputs.condition,
                    brand: inputs.brand,
                    transmission: inputs.transmission,
                    buyOrRent: inputs.buyOrRent,
                    fuel: inputs.fuel,
                    color: inputs.color,
                    priceToBuy: parseInt(inputs.priceToBuy),
                    priceToRent: parseInt(inputs.priceToRent),
                    latitude: inputs.latitude,
                    longitude: inputs.longitude,
                    images: images,
                },
                postDetail: {
                    description: inputs.description,
                    general1Title: inputs.general1Title,
                    general1Desc: inputs.general1Desc,
                    general2Title: inputs.general2Title,
                    general2Desc: inputs.general2Desc,
                    general3Title: inputs.general3Title,
                    general3Desc: inputs.general3Desc,
                }
            });

            navigate("/carros/"+res.data.id)
          } catch (err) {
            console.log(err);
            setError(error);
          }
    };

    //------------------------------------------------------------------------------------------------//

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const [isColorOpen, setIsColorOpen] = useState(false);

    const brandDropdownRef = useRef(null);
    const colorDropdownRef = useRef(null);

    const handleColorSelect = (color) => {
        setSelectedColor(color.value);
        setIsColorOpen(false);
        setError('');
    };

    const handleBrandSelect = (brand) => {
        setSelectedBrand(brand.value);
        setIsBrandOpen(false);
        setError('');
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
        title: '', description: '', general1Title: '', general1Desc: '',
        general2Title: '', general2Desc: '', general3Title: '', general3Desc: ''
    });

    const [charCounts, setCharCounts] = useState({
        title: 0, description: 0, general1Title: 0, general2Title: 0, 
        general3Title: 0, general1Desc: 0, general2Desc: 0, general3Desc: 0
    });

    const [general1Title, setGeneral1Title] = useState('');
    const [desc1, setDesc1] = useState(formValues.general1Desc);
    const [general1DescDisabled, setGeneral2Desc1Disabled] = useState(true);
    const [general2Title, setGeneral2Title] = useState('');
    const [descr2, setGeneral2Desc] = useState(formValues.general2Desc);
    const [general2DescDisabled, setGeneral2DescDisabled] = useState(true);
    const [general3Title, setGeneral3Title] = useState('');
    const [descr3, setGeneral3Desc] = useState(formValues.general3Desc);
    const [general3DescDisabled, setGeneral3DescDisabled] = useState(true);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'description' || name === 'title' || name === 'general1Title' || name === 'general1Desc' || name === 'general2Title' || name === 'general2Desc' || name === 'general3Title' || name === 'general3Desc') {
            setCharCounts(prev => ({
                ...prev,
                [name]: value.length
            }));
        }

        switch (name) {
            case 'general1Title':
                setGeneral1Title(value);
                break;
            case 'general1Desc':
                setDesc1(value);
                break;
            case 'general2Title':
                setGeneral2Title(value);
                break;
            case 'general2Desc':
                setGeneral2Desc(value);
                break;
            case 'general3Title':
                setGeneral3Title(value);
                break;
            case 'general3Desc':
                setGeneral3Desc(value);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        setGeneral2Desc1Disabled(general1Title.trim() === '');
        setGeneral2DescDisabled(general2Title.trim() === '');
        setGeneral3DescDisabled(general3Title.trim() === '');

        if (general1Title.trim() === '') {
            setDesc1('');
            setCharCounts(prev => ({
                ...prev,
                general1Desc: 0,
            }));
        }
        if (general2Title.trim() === '') {
            setGeneral2Desc('');
            setCharCounts(prev => ({
                ...prev,
                general2Desc: 0,
            }));
        }
        if (general3Title.trim() === '') {
            setGeneral3Desc('');
            setCharCounts(prev => ({
                ...prev,
                general3Desc: 0,
            }));
        }
    }, [general1Title, general2Title, general3Title]);

    useEffect(() => {
        setFormValues(prev => ({
            ...prev,
            general1Desc: desc1
        }));
        setFormValues(prev => ({
            ...prev,
            general2Desc: descr2
        }));
        setFormValues(prev => ({
            ...prev,
            general3Desc: descr3
        }));
    }, [desc1, descr2, descr3]);
  
    return (
        <div className="h-[100%] flex">
            <div className="overflow-y-auto">
                <h1 className="font-[500] text-[22px] md:text-[26px] mt-[30px]">Adicionar carro</h1>
                <UploadCarWidget uwConfig={{
                    cloudName: "dpwr6ol0l",
                    uploadPreset: "garagelink",
                    folder: "posts",
                    multiple: true
                }} setState={setImages} />

                <div className="grid grid-cols-2 sm:flex sm:justify-between w-[98%] sm:w-[96%] mt-[20px] items-center gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative w-[200px] h-[120px] sm:w-[280px] sm:h-[200px] bg-gray-200 flex items-center justify-center">
                            <img
                                src={`${image.replace('/upload/', '/upload/w_300,h_200,q_auto,f_auto/')}`}
                                alt="Imagem do carro"
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white 
                                rounded-full w-4 h-4 flex items-center justify-center p-3">
                                X
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-[30px] md:mr-[50px] md:mb-[100px] ml-0">
                    <form onSubmit={handleSubmit} className="flex md:justify-between flex-wrap gap-[20px] mb-10 md:mb-0">

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-[10px] items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="title">Nome e ano do carro</label>
                                    <span className="hidden lg:flex text-gray-600 text-sm">{charCounts.title}/30 caracteres</span>
                                </div>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <input onInput={() => setError('')} className="p-[20px] rounded-[5px] border border-gray-400" 
                                id="title" name="title" type="text" value={formValues.title} placeholder="Ex: Ford Fiesta 2018"
                                onChange={handleInputChange} maxLength="30"
                            />
                            <span className="lg:hidden text-gray-600 text-sm">{charCounts.title}/30 caracteres</span>
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label className="text-[14px] sm:text-[16px]" htmlFor="buyOrRent">Comprar ou alugar</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <select name="buyOrRent" onChange={handleTypeChange}
                                className="p-[21px] rounded-[5px] border border-gray-400">
                                
                                <option value="Comprar" defaultChecked>
                                    Comprar
                                </option>
                                <option value="Alugar">
                                    Alugar
                                </option>

                            </select>
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label className="text-[14px] sm:text-[16px]" htmlFor="price">
                                    {buyOrRent === 'Alugar' ? 'Valor do aluguel por hora' : 'Valor da compra'}
                                </label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            
                            <input onInput={() => setError('')} className="p-[20px] rounded-[5px] border border-gray-400" 
                                id={buyOrRent === 'Alugar' ? 'priceToRent' : 'priceToBuy'} name={buyOrRent === 'Alugar' ? 'priceToRent' : 'priceToBuy'} type="text" value={price} onChange={handlePriceChange}
                                placeholder={buyOrRent === 'Alugar' ? 'Ex: 120' : 'Ex: 120000'} 
                            />
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label className="text-[14px] sm:text-[16px]" htmlFor="city">Cidade</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <input onInput={() => setError('')} className="p-[20px] rounded-[5px] border border-gray-400" 
                                id="city" name="city" type="text" placeholder="Ex: São Paulo" 
                            />
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label className="text-[14px] sm:text-[16px]" htmlFor="address">Endereço completo</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <input onInput={() => setError('')} className="p-[20px] rounded-[5px] border border-gray-400" 
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
                                    
                                    <option value="Novo" defaultChecked>
                                        Novo
                                    </option>
                                    <option value="Usado">
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
                                    <span className="flex truncate max-[10px]">
                                        {brands.find(b => b.value === selectedBrand)?.name || 'Selecione a marca'}
                                    </span>
                                    <img className="absolute right-2" width={10} height={10} src="/arrow2.svg" alt="Seta" />
                                </button>
                                {isBrandOpen && (
                                    <ul className="absolute top-full left-0 w-full bg-white 
                                        border border-gray-400 mt-[0.05rem] z-10 rounded-[10px]">

                                        {brands.map((brand) => (
                                            <li key={brand.value} className="flex items-center p-2 
                                                cursor-pointer hover:bg-gray-200 rounded-[10px]"
                                                onClick={() => handleBrandSelect(brand)}>
                                                
                                                <img src={brand.logo} alt={`Logo ${brand.name}`} className="w-6 h-6 mr-2" />
                                                {brand.name}

                                            </li>
                                        ))}

                                    </ul>
                                )}
                            </div>
                        </div>
                        <input type="hidden" name="brand" value={selectedBrand || ''} />

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label className="text-[14px] sm:text-[16px]" htmlFor="transmission">Transmissão</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <select name="transmission" className="p-[21px] rounded-[5px] 
                                border border-gray-400">
                                    
                                <option value="Manual" defaultChecked>
                                    Manual
                                </option>
                                <option value="Automatico">
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
                                    <span className="flex truncate max-[10px]">
                                        {colors.find(c => c.value === selectedColor)?.name || 'Selecione a cor principal'}
                                    </span>
                                    <img className="absolute right-2" width={10} height={10} src="/arrow2.svg" alt="Seta" />
                                </button>
                                {isColorOpen && (
                                    <ul name="color" className="absolute top-full left-0 w-full bg-white border border-gray-400 mt-[0.05rem] z-10 rounded-[10px]">
                                        {colors.map((color) => (
                                            <li
                                                key={color.value}
                                                className="flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded-[10px]"
                                                onClick={() => handleColorSelect(color)}
                                            >
                                                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color.hex1 }} />
                                                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color.hex2 }} />
                                                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color.hex3 }} />
                                                {color.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <input type="hidden" name="color" value={selectedColor || ''} />
                        </div>

                        <div className="flex flex-col gap-[5] w-[95%] md:w-[100%]">
                            <div className="flex justify-between items-center">
                                <label className="text-[14px] sm:text-[16px]" htmlFor="description">Descrição</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <textarea onInput={() => setError('')} className="p-[20px] rounded-[5px] border border-gray-400 h-[200px] resize-none" 
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
                                    
                                <option value="Diesel" defaultChecked>
                                    Diesel
                                </option>
                                <option value="Eletrecidade">
                                    Eletrecidade
                                </option>
                                <option value="Etanol">
                                    Etanol
                                </option>
                                <option value="Flex">
                                    Flex
                                </option>
                                <option value="Gas">
                                    Gás
                                </option>
                                <option value="Gasolina">
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
                            <input onInput={() => setError('')} className="p-[20px] rounded-[5px] border border-gray-400" 
                                id="latitude" name="latitude" type="number" step="any" placeholder="Ex: -23.59105941675351"
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
                            <input onInput={() => setError('')} className="p-[20px] rounded-[5px] border border-gray-400" 
                                id="longitude" name="longitude" type="number" step="any" placeholder="Ex: -46.69087039560111"
                            />
                        </div>

                        <div className="grid grid-cols-2 w-[100%] gap-[20px]">
                            <div className="w-[90%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="general1Title">Título 1</label>
                                    <span className="text-gray-600 text-sm flex gap-[2px]">{charCounts.general1Title}/30 <span className="hidden sm:flex">caracteres</span></span>
                                </div>
                                <input className="p-[20px] rounded-[5px] border border-gray-400" 
                                    id="general1Title" name="general1Title" type="text" placeholder="Dê motivos para as pessoas comprarem o carro"
                                    onChange={handleInputChange} value={formValues.general1Title} maxLength="30"
                                />
                            </div>

                            <div className="w-[90%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="general1Desc">Descrição 1</label>
                                    <span className="text-gray-600 text-sm flex gap-[2px]">{charCounts.general1Desc}/70 <span className="hidden sm:flex">caracteres</span></span>
                                </div>
                                <input className="p-[20px] rounded-[5px] border border-gray-400 disabled:bg-gray-600/20" 
                                    id="general1Desc" name="general1Desc" type="text" placeholder="Adicione uma descrição sobre o título escolhido"
                                    disabled={general1DescDisabled} onChange={handleInputChange} maxLength="70" value={formValues.general1Desc}
                                />
                            </div>

                            <div className="w-[90%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="general2Title">Título 2</label>
                                    <span className="text-gray-600 text-sm flex gap-[2px]">{charCounts.general2Title}/30 <span className="hidden sm:flex">caracteres</span></span>
                                </div>
                                <input className="p-[20px] rounded-[5px] border border-gray-400" 
                                    id="general2Title" name="general2Title" type="text" placeholder="Dê motivos para as pessoas comprarem o carro"
                                    onChange={handleInputChange} value={formValues.general2Title} maxLength="30"
                                />
                            </div>

                            <div className="w-[90%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="general2Desc">Descrição 2</label>
                                    <span className="text-gray-600 text-sm flex gap-[2px]">{charCounts.general2Desc}/70 <span className="hidden sm:flex">caracteres</span></span>
                                </div>
                                <input className="p-[20px] rounded-[5px] border border-gray-400 disabled:bg-gray-600/20" 
                                    id="general2Desc" name="general2Desc" type="text" placeholder="Adicione uma descrição sobre o título escolhido"
                                    disabled={general2DescDisabled} onChange={handleInputChange} maxLength="70" value={formValues.general2Desc}
                                />
                            </div>

                            <div className="w-[90%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="general3Title">Título 3</label>
                                    <span className="text-gray-600 text-sm flex gap-[2px]">{charCounts.general3Title}/30 <span className="hidden sm:flex">caracteres</span></span>
                                </div>
                                <input className="p-[20px] rounded-[5px] border border-gray-400" 
                                    id="general3Title" name="general3Title" type="text" placeholder="Dê motivos para as pessoas comprarem o carro"
                                    onChange={handleInputChange} value={formValues.general3Title} maxLength="30"
                                />
                            </div>

                            <div className="w-[90%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="general3Desc">Descrição 3</label>
                                    <span className="text-gray-600 text-sm flex gap-[2px]">{charCounts.general3Desc}/70 <span className="hidden sm:flex">caracteres</span></span>
                                </div>
                                <input className="p-[20px] rounded-[5px] border border-gray-400 disabled:bg-gray-600/20" 
                                    id="general3Desc" name="general3Desc" type="text" placeholder="Adicione uma descrição sobre o título escolhido"
                                    disabled={general3DescDisabled} onChange={handleInputChange} maxLength="70" value={formValues.general3Desc}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col justify-center w-[100%] gap-y-4">
                            <button className="w-[95%] md:w-[100%] p-[30px] text-white font-semibold text-[22px] bg-green-500 uppercase hover:bg-green-400 h-[100%] border-0 cursor-pointer rounded-[5px]">
                                Publicar carro
                            </button>
                            {error && <span className="text-red-600 flex justify-center text-[18px]">{error}</span>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
  );
}

export default NewPostPage;