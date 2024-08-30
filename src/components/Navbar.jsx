import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const linkClasses = "transition duration-[0.4s] ease-in-out hover:scale-[1.1]";

    return (
        <nav className="flex text-center items-center justify-between mt-[40px]">
            <div className="flex items-center flex-[3] gap-[50px]">
                <Link to="/" className="flex items-center gap-[10px] transition duration-[0.4s] ease-in-out hover:scale-[1.1]">
                    <img className="" width={60} height={60} src="/logo.svg" alt="Logo GarageLink" />
                    <span className="font-bold text-[20px] flex md:hidden lg:flex">GarageLink</span>
                </Link>

                <Link to="/" className={`hidden md:block ${linkClasses}`}>Início</Link>
                <Link to="/" className={`hidden md:block ${linkClasses}`}>Sobre</Link>
                <Link to="/" className={`hidden md:block ${linkClasses}`}>Contatos</Link>
            </div>
            <div className="flex flex-[2] justify-end gap-[10px] items-center">
                <Link to="/" className="hidden md:flex z-10 py-[12px] px-[24px] transition duration-[0.4s] ease-in-out hover:scale-[1.1]">Entrar</Link>
                <Link to="/" className="hidden md:flex z-10 bg-[#fece51] rounded-sm py-[12px] px-[24px] transition duration-[0.4s] ease-in-out hover:scale-[1.1]">Criar conta</Link>
                
                <div className="flex-initial md:hidden cursor-pointer z-10">
                    <img width={36} height={36} src="/menu.svg" alt="Menu" onClick={() => setOpen((prev) => !prev)}/>
                </div>

                <div className={`absolute top-0 bg-black text-white h-[100vh] w-[50%] 
                    transition-all duration-[1s] ease-in-out text-[20px]
                    flex flex-col items-center justify-center gap-y-[50px]
                ${open ? "right-0" : "right-[-55%]"} md:hidden`}
                >
                    <Link to="/" className={`${linkClasses}`}>Início</Link>
                    <Link to="/" className={`${linkClasses}`}>Sobre</Link>
                    <Link to="/" className={`${linkClasses}`}>Contatos</Link>
                    <Link to="/" className={`${linkClasses}`}>Entrar</Link>
                    <Link to="/" className={`${linkClasses}`}>Criar conta</Link>
                </div>

                {location.pathname === "/" && (
                    <div className="absolute bg-[#fcf5f3] rounded-[50%] z-0
                        hidden xl:block
                        xl:top-[-25%] xl:right-[-24%] xl:w-[1000px] xl:h-[1000px]
                        2xl:top-[-25%] 2xl:right-[-300px] 2xl:w-[1100px] 2xl:h-[1100px]"
                    ></div>
                )}
            </div>
        </nav>
    )
}

export default Navbar;