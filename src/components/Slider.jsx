import { useEffect, useState } from "react";

function Slider({ images }) {
    const [imageIndex, setImageIndex] = useState(null);
    
    const changeSlide = (direction) => {
        if (direction === "esquerda") {
            if (imageIndex === 0) {
                setImageIndex(images.length-1)
            } else {
                setImageIndex(imageIndex-1)
            }
        } else {
            if (imageIndex === images.length-1) {
                setImageIndex(0)
            } else {
                setImageIndex(imageIndex+1)
            }
        }
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setImageIndex(null);
            } else if (event.key === 'ArrowLeft') {
                changeSlide("esquerda");
            } else if (event.key === 'ArrowRight') {
                changeSlide("direita");
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageIndex]);

    useEffect(() => {
        if (imageIndex !== null) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        
        return () => document.body.classList.remove('no-scroll');
    }, [imageIndex]);

    return (
        <div className="w-[100%] h-[350px] flex gap-[10px] md:gap-[20px]">

            {imageIndex !== null && (
                <div className="absolute z-[9999] w-[100vw] h-[100vh] top-0 left-0 
                    bg-black flex justify-between items-center overflow-hidden"
                >
                
                    {/* Seta para a esquerda */}
                    <div onClick={() => changeSlide("esquerda")}
                        className="flex-[1] flex items-center justify-center 
                        cursor-pointer transition-all duration-[0.4s] ease-in-out 
                        hover:scale-[1.1]">

                        <img className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] 
                            lg:w-[50px] lg:h-[50px]" src="/arrow.svg" 
                            alt="Seta para a esquerda" 
                        />
                    </div>

                    {/* Imagem central */}
                    <div className="flex-[10]">
                        <img src={images[imageIndex]} alt="Imagem do carro selecionada"
                            className="flex w-[100%] h-[100%] object-cover rounded-md"
                        />
                    </div>

                    {/* Seta para a direita */}
                    <div onClick={() => changeSlide("direita")}
                        className="flex-[1] flex items-center justify-center cursor-pointer 
                        transition-all duration-[0.4s] ease-in-out hover:scale-[1.1]">

                        <img className="transform rotate-180 w-[20px] h-[20px] 
                            md:w-[30px] md:h-[30px] lg:w-[50px] lg:h-[50px]" 
                            src="/arrow.svg" alt="Seta para a direita" 
                        />

                    </div>

                    {/* Fechar a imagem */}
                    <div onClick={() => setImageIndex(null)}
                        className="absolute top-0 right-0 text-[#fff] font-bold p-[50px] 
                        cursor-pointer transition-all duration-[0.4s] ease-in-out hover:scale-[1.1]">

                        <img width={36} height={36} src="/close.svg" alt="Fechar a imagem" />

                    </div>

                </div>
            )}

            <div className="flex-[3]">
                <img src={images[0]} alt="Imagem do carro maior" onClick={() => setImageIndex(0)}
                    className="w-[100%] h-[100%] object-cover rounded-[10px] cursor-pointer 
                    lg:transition-all lg:duration-[0.4s] lg:ease-in-out lg:hover:scale-[1.05]"  
                />
            </div>
            <div className="flex-[1] flex flex-col justify-between gap-[20px]">
                {images.slice(1).map((image, index) => (
                    <img src={image} key={index} alt="Imagem do carro menores" onClick={() => setImageIndex(index+1)}
                        className="w-[100%] h-[100px] object-cover rounded-[10px] cursor-pointer 
                        lg:transition-all lg:duration-[0.4s] lg:ease-in-out lg:hover:scale-[1.05]"
                    />
                ))}
            </div>
        </div>
    )
}

export default Slider;