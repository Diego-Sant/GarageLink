import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import apiRequest from "../lib/apiRequest";
import UploadCarWidget from "../components/uploadCarWidget";

const brands = [
    { name: 'Audi', value: 'Audi', logo: 'https://diego-sant.github.io/QuizApp/img/audi.svg' },
    { name: 'Bentley', value: 'Bentley', logo: 'https://diego-sant.github.io/QuizApp/img/bentley.svg' },
    { name: 'BMW', value: 'BMW', logo: 'https://diego-sant.github.io/QuizApp/img/bmw.svg' },
    { name: 'BYD', value: 'BYD', logo: 'https://diego-sant.github.io/QuizApp/img/byd.svg' },
    { name: 'Cadillac', value: 'Cadillac', logo: 'https://diego-sant.github.io/QuizApp/img/cadillac.svg' },
    { name: 'Chevrolet', value: 'Chevrolet', logo: 'https://diego-sant.github.io/QuizApp/img/chevrolet.svg' },
    { name: 'Citroën', value: 'Citroen', logo: 'https://diego-sant.github.io/QuizApp/img/citroen.svg' },
    { name: 'Dodge', value: 'Dodge', logo: 'https://diego-sant.github.io/QuizApp/img/dodge.svg' },
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
    { name: 'Tesla', value: 'Tesla', logo: 'https://diego-sant.github.io/QuizApp/img/tesla.svg' },
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

function EditPostPage() {
    const [buyOrRent, setBuyOrRent] = useState('Comprar');
    const { id } = useParams();
    const [error, setError] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [post, setPost] = useState(null);

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        title: '', city: '', address: '', description: '',
        buyOrRent: '', priceToBuy: '', priceToRent: '',
        condition: '', brand: '', transmission: '', color: '',
        fuel: '', latitude: '', longitude: '',
        general1Title: '', general1Desc: '', general2Title: '', 
        general2Desc: '', general3Title: '', general3Desc: ''
    });

    const [charCounts, setCharCounts] = useState({
        title: 0, address: 0, description: 0, general1Title: 0, general2Title: 0, 
        general3Title: 0, general1Desc: 0, general2Desc: 0, general3Desc: 0
    });

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const [isTooltipVisibleLatitude, setIsTooltipVisibleLatitude] = useState(false);
    const [isTooltipVisibleLongitude, setIsTooltipVisibleLongitude] = useState(false);

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        const onlyNumbers = value.replace(/\D/g, '');
    
        setFormValues(prev => ({
            ...prev,
            [name]: onlyNumbers
        }));
    
        setPrice(onlyNumbers);
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
        setFormValues(prevValues => ({ ...prevValues, color: color.value }));
        setIsColorOpen(false);
        setError('');
    };

    const handleBrandSelect = (brand) => {
        setSelectedBrand(brand.value);
        setFormValues(prevValues => ({ ...prevValues, brand: brand.value }));
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

    const [general1Title, setGeneral1Title] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [desc1, setDesc1] = useState('');
    const [general1DescDisabled, setGeneral2Desc1Disabled] = useState(true);
    const [general2Title, setGeneral2Title] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [descr2, setGeneral2Desc] = useState('');
    const [general2DescDisabled, setGeneral2DescDisabled] = useState(true);
    const [general3Title, setGeneral3Title] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [descr3, setGeneral3Desc] = useState('');
    const [general3DescDisabled, setGeneral3DescDisabled] = useState(true);
    
    useEffect(() => {
        if (post) {
            setGeneral1Title(post.general1Title || '');
            setDesc1(post.general1Desc || '');
            setGeneral2Title(post.general2Title || '');
            setGeneral2Desc(post.general2Desc || '');
            setGeneral3Title(post.general3Title || '');
            setGeneral3Desc(post.general3Desc || '');
    
            setGeneral2Desc1Disabled(post.general1Title?.trim() === '');
            setGeneral2DescDisabled(post.general2Title?.trim() === '');
            setGeneral3DescDisabled(post.general3Title?.trim() === '');
        }
    }, [post]);
    
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
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    
        if (name === 'buyOrRent') {
            setBuyOrRent(value);
            setPrice(value === 'Alugar' ? formValues.priceToRent : formValues.priceToBuy);
        }

        setCharCounts(prev => ({
            ...prev,
            [name]: value.length
        }));
    
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
        const fetchPost = async () => {
            try {
                const res = await apiRequest.get(`/publicacoes/${id}`);
                setPost(res.data);
                setImages(res.data.images);
    
                setFormValues({
                    title: res.data.title,
                    city: res.data.city,
                    address: res.data.address,
                    buyOrRent: res.data.buyOrRent,
                    priceToRent: res.data.priceToRent || '',
                    priceToBuy: res.data.priceToBuy || '',
                    condition: res.data.condition,
                    brand: res.data.brand,
                    transmission: res.data.transmission,
                    color: res.data.color,
                    fuel: res.data.fuel,
                    latitude: res.data.latitude,
                    longitude: res.data.longitude,
                    description: res.data.postDetail.description,
                    general1Title: res.data.postDetail.general1Title,
                    general1Desc: res.data.postDetail.general1Desc,
                    general2Title: res.data.postDetail.general2Title,
                    general2Desc: res.data.postDetail.general2Desc,
                    general3Title: res.data.postDetail.general3Title,
                    general3Desc: res.data.postDetail.general3Desc,
                });
    
                setBuyOrRent(res.data.buyOrRent);
                setPrice(res.data.buyOrRent === 'Alugar' ? res.data.priceToRent : res.data.priceToBuy);

                setSelectedBrand(res.data.brand);
                setSelectedColor(res.data.color);
    
                setCharCounts({
                    title: res.data.title.length,
                    city: res.data.city.length,
                    address: res.data.address.length,
                    description: res.data.postDetail.description.length,
                    general1Title: res.data.postDetail.general1Title.length,
                    general1Desc: res.data.postDetail.general1Desc.length,
                    general2Title: res.data.postDetail.general2Title.length,
                    general2Desc: res.data.postDetail.general2Desc.length,
                    general3Title: res.data.postDetail.general3Title.length,
                    general3Desc: res.data.postDetail.general3Desc.length,
                });
            } catch (err) {
                console.error(err);
                setError('Erro ao carregar post.');
            }
        };
    
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);

        if (images.length > 4) {
            setError('Você pode adicionar no máximo 4 imagens.');
            return;
        }

        if (images.length < 1) {
            setError('Você precisa adicionar pelo menos 1 imagem!.');
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

        const noAccentCity = inputs.city.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const priceToBuy = inputs.priceToBuy ? parseInt(inputs.priceToBuy, 10) : null;
        const priceToRent = inputs.priceToRent ? parseInt(inputs.priceToRent, 10) : null;
        
        try {
          await apiRequest.put(`/publicacoes/${id}`, {
            title: inputs.title,
            city: inputs.city,
            noAccentCity: noAccentCity,
            address: inputs.address,
            condition: inputs.condition,
            brand: inputs.brand,
            transmission: inputs.transmission,
            buyOrRent: inputs.buyOrRent,
            fuel: inputs.fuel,
            color: inputs.color,
            priceToBuy,
            priceToRent,
            latitude: inputs.latitude,
            longitude: inputs.longitude,
            images: images,
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

            navigate(`/carros/${id}`);
          } catch (err) {
            console.log(err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data.message : "Erro desconhecido");
          }
    };
  
    return (
        <div className="min-h-screen flex flex-col dark:text-white">
            <div className="w-full">
                <h1 className="font-[500] text-[22px] md:text-[26px] mt-[30px] mb-2">Editar carro</h1>
                <UploadCarWidget uwConfig={{
                    cloudName: "dpwr6ol0l",
                    uploadPreset: "garagelink",
                    folder: "posts",
                    multiple: true
                }} setState={setImages} />

                <div className="grid grid-cols-2 sm:flex sm:justify-between w-[100%] mt-[20px] items-center gap-4">
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

                <div className="mt-[30px] md:mb-[100px]">
                    <form onSubmit={handleSubmit} className="flex justify-between flex-wrap gap-[20px] mb-10 md:mb-0">

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-[10px] items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="title">Nome e ano do carro</label>
                                    <span className="hidden lg:flex text-gray-600 dark:text-gray-300 text-sm">
                                        {charCounts.title}/30 caracteres
                                    </span>
                                </div>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <input onInput={() => setError('')} className="p-[20px] rounded-[5px] 
                                dark:dark:bg-[#1a1a1a] border border-gray-400" 
                                id="title" name="title" type="text" value={formValues.title} placeholder="Ex: Ford Fiesta 2018"
                                onChange={handleInputChange} maxLength="30"
                            />
                            <span className="lg:hidden text-gray-600 dark:text-gray-300 text-sm">
                                {charCounts.title}/30 caracteres
                            </span>
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label className="text-[14px] sm:text-[16px]" htmlFor="buyOrRent">Comprar ou alugar</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <select name="buyOrRent" onChange={handleInputChange}
                                className="p-[21px] rounded-[5px] border border-gray-400
                                dark:dark:bg-[#1a1a1a]" value={formValues.buyOrRent}>
                                
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
                                    {formValues.buyOrRent === 'Alugar' ? 'Valor do aluguel por dia' : 'Valor da compra'}
                                </label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            
                            <input
                                onInput={() => setError('')}
                                className="p-[20px] rounded-[5px] dark:bg-[#1a1a1a] border border-gray-400"
                                id={buyOrRent === 'Alugar' ? 'priceToRent' : 'priceToBuy'}
                                name={buyOrRent === 'Alugar' ? 'priceToRent' : 'priceToBuy'}
                                type="text"
                                onChange={handlePriceChange}
                                value={formValues[buyOrRent === 'Alugar' ? 'priceToRent' : 'priceToBuy']}
                                placeholder={buyOrRent === 'Alugar' ? 'Ex: 120' : 'Ex: 120000'}
                            />
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label className="text-[14px] sm:text-[16px]" htmlFor="city">Cidade</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <input onInput={() => setError('')} className="p-[20px] rounded-[5px] 
                                dark:dark:bg-[#1a1a1a] border border-gray-400" 
                                id="city" name="city" type="text" placeholder="Ex: São Paulo"
                                value={formValues.city} onChange={handleInputChange}
                            />
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-[10px] items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="address">Endereço completo</label>
                                    <span className="hidden lg:flex text-gray-600 dark:text-gray-400 text-sm">
                                        {charCounts.address}/50 caracteres
                                    </span>
                                </div>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <input onInput={() => setError('')} className="p-[20px] rounded-[5px] 
                                dark:dark:bg-[#1a1a1a] border border-gray-400" 
                                id="address" name="address" value={formValues.address} type="text" placeholder="Ex: Guarulhos, SP - Brasil"
                                onChange={handleInputChange} maxLength="50"
                            />
                            <span className="lg:hidden text-gray-600 text-sm dark:text-gray-400">
                                {charCounts.address}/50 caracteres
                            </span>
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label className="text-[14px] sm:text-[16px]" htmlFor="condition">Condição</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <select name="condition" className="p-[21px] rounded-[5px] 
                                border border-gray-400 dark:dark:bg-[#1a1a1a]"
                                value={formValues.condition} onChange={handleInputChange}>
                                    
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
                                    className="p-[20px] rounded-[5px] border border-gray-400 w-full flex items-center justify-between">
                                    
                                    <span className="flex truncate max-[10px]">
                                        {brands.find(b => b.value === selectedBrand)?.name || 'Selecione a marca'}
                                    </span>

                                    <img className="absolute right-2
                                    dark:filter dark:invert dark:brightness-[75%]
                                    dark:sepia-[98%] dark:saturate-[8%] dark:hue-rotate-[115deg]
                                    dark:contrast-[102%]" 
                                    width={10} height={10} src="/arrow2.svg" 
                                    alt="Seta" />
                                    
                                </button>
                                {isBrandOpen && (
                                    <ul className="absolute top-full grid grid-cols-2 left-0 w-[300px] md:w-full bg-white 
                                        border border-gray-400 mt-[0.05rem] z-10 rounded-[10px]
                                        dark:dark:bg-[#1a1a1a]">

                                        {brands.map((brand) => (
                                            <li key={brand.value} className="flex items-center p-4 md:p-2 
                                                cursor-pointer hover:bg-gray-200 rounded-[10px]
                                                dark:hover:bg-[#2b2b2b]"
                                                onClick={() => handleBrandSelect(brand)}>
                                                
                                                <img src={brand.logo} alt={`Logo ${brand.name}`} className="w-6 h-6 mr-2
                                                dark:filter dark:invert dark:brightness-[75%]
                                                dark:sepia-[98%] dark:saturate-[8%] dark:hue-rotate-[115deg]
                                                dark:contrast-[102%]"/>
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
                                dark:dark:bg-[#1a1a1a] border border-gray-400"
                                value={formValues.transmission} onChange={handleInputChange}>
                                    
                                <option value="Manual" defaultChecked>
                                    Manual
                                </option>
                                <option value="Automatico">
                                    Automático
                                </option>
                                
                            </select>
                        </div>

                        <div className="w-[100%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label className="text-[14px] sm:text-[16px]" htmlFor="color">Cor</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <div className="relative" ref={colorDropdownRef}>
                                <button
                                    type="button"
                                    onClick={toggleColorDropdown}
                                    className="p-[20px] rounded-[5px] border border-gray-400 w-full flex items-center justify-between">
                                    
                                    <span className="flex truncate max-[10px]">
                                        {colors.find(c => c.value === selectedColor)?.name || 'Selecione a cor principal'}
                                    </span>

                                    <img className="absolute right-2 dark:filter dark:invert dark:brightness-[75%]
                                    dark:sepia-[98%] dark:saturate-[8%] dark:hue-rotate-[115deg]
                                    dark:contrast-[102%]" 
                                    width={10} height={10} src="/arrow2.svg" 
                                    alt="Seta" />

                                </button>
                                {isColorOpen && (
                                    <ul name="color" className="absolute top-full left-0 w-full bg-white border border-gray-400 mt-[0.05rem] z-10 rounded-[10px]">
                                        {colors.map((color) => (
                                            <li
                                                key={color.value}
                                                className="flex items-center p-2 cursor-pointer 
                                                hover:bg-gray-200 first-of-type:rounded-tl-[10px] first-of-type:rounded-tr-[10px]
                                                last-of-type:rounded-bl-[10px] last-of-type:rounded-br-[10px]
                                                dark:dark:bg-[#1a1a1a] dark:hover:bg-[#2b2b2b]"
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

                        <div className="flex flex-col gap-[5] w-[100%]">
                            <div className="flex justify-between items-center">
                                <label className="text-[14px] sm:text-[16px]" htmlFor="description">Descrição</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <textarea onInput={() => setError('')} className="p-[20px] rounded-[5px] 
                                border border-gray-400 h-[200px] resize-none dark:dark:bg-[#1a1a1a]" 
                                id="description" name="description" value={formValues.description} type="text"
                                onChange={handleInputChange} maxLength="750"
                            />
                            <span className="text-gray-600 text-sm dark:text-gray-400">
                                {charCounts.description}/750 caracteres
                            </span>
                        </div>

                        <div className="w-[45%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <label className="text-[14px] sm:text-[16px]" htmlFor="fuel">Combustível</label>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <select name="fuel" className="p-[21px] rounded-[5px] 
                                border border-gray-400 dark:dark:bg-[#1a1a1a]"
                                value={formValues.fuel} onChange={handleInputChange}>
                                    
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

                                        <img className="dark:filter dark:invert dark:brightness-[75%]
                                        dark:sepia-[98%] dark:saturate-[8%] dark:hue-rotate-[115deg]
                                        dark:contrast-[102%]" width={17} height={17} src="/info.svg" 
                                        alt="" />

                                        {isTooltipVisibleLatitude && (
                                            <div className="absolute w-[100px] md:w-[200px] text-white 
                                                bg-gray-800 border border-gray-400 p-2 rounded shadow-lg 
                                                text-sm">
                                                Veja no Google Maps para uma resposta precisa.
                                            </div>
                                        )}

                                    </div>
                                </div>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <input onInput={() => setError('')} className="p-[20px] rounded-[5px] 
                                dark:dark:bg-[#1a1a1a] border border-gray-400" 
                                id="latitude" name="latitude" type="text" step="any" 
                                placeholder="Ex: -23.59105941675351" value={formValues.latitude}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="w-[100%] md:w-[30%] flex flex-col gap-[5]">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-[5px] items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="longitude">Longitude</label>
                                    <div className="relative" onMouseEnter={() => setIsTooltipVisibleLongitude(true)}
                                        onMouseLeave={() => setIsTooltipVisibleLongitude(false)}>
                                        
                                        <img className="dark:filter dark:invert dark:brightness-[75%]
                                        dark:sepia-[98%] dark:saturate-[8%] dark:hue-rotate-[115deg]
                                        dark:contrast-[102%]" width={17} height={17} src="/info.svg" 
                                        alt="" />

                                        {isTooltipVisibleLongitude && (
                                            <div className="absolute w-[100px] md:w-[200px] text-white 
                                                bg-gray-800 border border-gray-400 p-2 rounded shadow-lg 
                                                text-sm">
                                                Veja no Google Maps para uma resposta precisa.
                                            </div>
                                        )}

                                    </div>
                                </div>
                                <span className="text-red-600 mr-1 font-bold">*</span>
                            </div>
                            <input onInput={() => setError('')} className="p-[20px] border
                                dark:dark:bg-[#1a1a1a] rounded-[5px] border-gray-400" 
                                id="longitude" name="longitude" type="text" step="any" 
                                placeholder="Ex: -46.69087039560111" value={formValues.longitude}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 w-[100%] gap-[20px]">
                            <div className="w-[100%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="general1Title">Título 1</label>
                                    <span className="text-gray-600 text-sm flex gap-[2px] dark:text-gray-400">
                                        {charCounts.general1Title}/30 
                                        <span className="hidden sm:flex">caracteres</span>
                                    </span>
                                </div>

                                <input className="p-[20px] rounded-[5px] border 
                                    dark:bg-[#1a1a1a] border-gray-400" 
                                    id="general1Title" name="general1Title" placeholder="Dê motivos para as pessoas comprarem o carro"
                                    onChange={handleInputChange} type="text"
                                    value={formValues.general1Title} maxLength="30"
                                />
                            </div>

                            <div className="w-[100%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="general1Desc">Descrição 1</label>
                                    <span className="text-gray-600 text-sm flex 
                                        gap-[2px] dark:text-gray-400">
                                        {charCounts.general1Desc}/70 
                                        <span className="hidden sm:flex">caracteres</span>
                                    </span>
                                </div>

                                <input className="p-[20px] rounded-[5px] border 
                                    dark:bg-[#1a1a1a] border-gray-400 
                                    disabled:bg-gray-600/20 dark:disabled:bg-[#2b2b2b]" 
                                    id="general1Desc" name="general1Desc" type="text" placeholder="Adicione uma descrição sobre o título escolhido"
                                    disabled={general1DescDisabled} onChange={handleInputChange} maxLength="70" value={formValues.general1Desc}
                                />
                            </div>

                            <div className="w-[100%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="general2Title">Título 2</label>
                                    <span className="text-gray-600 text-sm flex gap-[2px] dark:text-gray-400">
                                        {charCounts.general2Title}/30 
                                        <span className="hidden sm:flex">caracteres</span>
                                    </span>
                                </div>

                                <input className="p-[20px] rounded-[5px] border 
                                    dark:bg-[#1a1a1a] border-gray-400" 
                                    id="general2Title" name="general2Title" type="text" placeholder="Dê motivos para as pessoas comprarem o carro"
                                    onChange={handleInputChange} value={formValues.general2Title} maxLength="30"
                                />
                            </div>

                            <div className="w-[100%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="general2Desc">Descrição 2</label>
                                    <span className="text-gray-600 text-sm flex gap-[2px] dark:text-gray-400">
                                        {charCounts.general2Desc}/70 
                                        <span className="hidden sm:flex">caracteres</span>
                                    </span>
                                </div>

                                <input className="p-[20px] rounded-[5px] border 
                                    dark:bg-[#1a1a1a] border-gray-400 
                                    disabled:bg-gray-600/20 dark:disabled:bg-[#2b2b2b]" 
                                    id="general2Desc" name="general2Desc" type="text" placeholder="Adicione uma descrição sobre o título escolhido"
                                    disabled={general2DescDisabled} onChange={handleInputChange} maxLength="70" value={formValues.general2Desc}
                                />
                            </div>

                            <div className="w-[100%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="general3Title">Título 3</label>
                                    <span className="text-gray-600 text-sm flex gap-[2px] dark:text-gray-400">
                                        {charCounts.general3Title}/30 
                                        <span className="hidden sm:flex">caracteres</span>
                                    </span>
                                </div>

                                <input className="p-[20px] rounded-[5px] border 
                                    dark:bg-[#1a1a1a] border-gray-400" 
                                    id="general3Title" name="general3Title" type="text" placeholder="Dê motivos para as pessoas comprarem o carro"
                                    onChange={handleInputChange} value={formValues.general3Title} maxLength="30"
                                />
                            </div>

                            <div className="w-[100%] md:w-[100%] flex flex-col gap-[5]">
                                <div className="flex justify-between items-center">
                                    <label className="text-[14px] sm:text-[16px]" htmlFor="general3Desc">Descrição 3</label>
                                    <span className="text-gray-600 text-sm flex gap-[2px] dark:text-gray-400">
                                        {charCounts.general3Desc}/70 
                                        <span className="hidden sm:flex">caracteres</span>
                                    </span>
                                </div>

                                <input className="p-[20px] rounded-[5px] border 
                                    border-gray-400 dark:bg-[#1a1a1a]
                                    disabled:bg-gray-600/20 dark:disabled:bg-[#2b2b2b]" 
                                    id="general3Desc" name="general3Desc" type="text" placeholder="Adicione uma descrição sobre o título escolhido"
                                    disabled={general3DescDisabled} onChange={handleInputChange} maxLength="70" value={formValues.general3Desc}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col justify-center w-[100%] gap-y-4 mb-[60px]">
                            <button className="w-[100%] p-[30px] text-white font-semibold text-[22px] bg-green-500 uppercase hover:bg-green-400 h-[100%] border-0 cursor-pointer rounded-[5px]">
                                Atualizar informações do carro
                            </button>
                            {error && <span className="text-red-600 flex justify-center text-[18px]">{error}</span>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
  );
}

export default EditPostPage;