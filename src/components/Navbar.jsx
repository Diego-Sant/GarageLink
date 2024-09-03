import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const user = true;

    const linkClasses = "transition duration-[0.4s] ease-in-out hover:scale-[1.1] z-50";

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
                {user ? (
                    <div className="flex items-center font-bold">
                        <Link to="/perfil" className="flex items-center z-50"> 
                            <img className="w-[40px] h-[40px] rounded-[50%] mr-[10px] object-cover transition-all duration-[0.4s] ease-in-out hover:scale-[1.1]" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Imagem de perfil" />
                            <span className="mr-[20px] hidden md:flex">Diego</span>
                        </Link>
                        <Link className="hidden md:flex relative py-[12px] px-[24px] bg-[#fece51] hover:bg-[#fece51]/80 cursor-pointer border-0 z-50" to="/perfil">
                            <div className="absolute -top-[8px] -right-2 bg-red-600 hover:bg-red-600/90 text-white rounded-[50%] w-[26px] h-[26px] flex items-center justify-center">3</div>
                            <span>Perfil</span>
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link to="/" className="hidden md:flex z-10 py-[12px] px-[24px] transition duration-[0.4s] ease-in-out hover:scale-[1.1]">Entrar</Link>
                        <Link to="/" className="hidden md:flex z-10 bg-[#fece51] rounded-sm py-[12px] px-[24px] transition duration-[0.4s] ease-in-out hover:scale-[1.1]">Criar conta</Link>
                    </>
                )}
                
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
                    {user ? (
                        <>
                            <Link to="/perfil" className={`${linkClasses}`}>Perfil</Link>
                            <Link to="/" className={`${linkClasses}`}>Sair</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/" className={`${linkClasses}`}>Entrar</Link>
                            <Link to="/" className={`${linkClasses}`}>Criar conta</Link>
                        </>
                    )}
                </div>

                {(location.pathname === "/" || location.pathname === "/cadastrar" || location.pathname === "/entrar") && (
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