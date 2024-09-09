import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { useTheme } from "../context/ThemeContext";
import DarkLightButton from "./DarkLightButton";

function Navbar() {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const { darkMode, toggleDarkMode } = useTheme();
    const {updateUser, currentUser} = useContext(AuthContext);

    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const handleLogout = async () => {
        try {
            await apiRequest.post("/auth/sair");
            updateUser(null);

            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const linkClasses = "transition duration-[0.4s] ease-in-out hover:scale-[1.1] z-50";

    return (
        <nav className="flex text-center items-center justify-between mt-[40px] dark:text-white">
            <div className="flex items-center flex-[3] gap-[50px]">
                <Link to="/" className="flex items-center gap-[6px] transition 
                    duration-[0.4s] ease-in-out hover:scale-[1.1]">
                    <img className="" width={45} height={45} src="/logo.svg" alt="Logo GarageLink" />
                    <span className="font-bold text-[20px] flex md:hidden lg:flex">
                        GarageLink
                    </span>
                </Link>

                <Link to="/" className={`hidden md:block ${linkClasses}`}>Início</Link>
                <Link to="/" className={`hidden md:block ${linkClasses}`}>Sobre</Link>
                <Link to="/" className={`hidden md:block ${linkClasses}`}>Contatos</Link>
            </div>
            <div className="flex flex-[2] justify-end gap-[10px] items-center">
                <DarkLightButton
                    topic={darkMode ? 'dark' : 'light'} 
                    changeTopic={toggleDarkMode} 
                />
                {currentUser ? (
                    <div className="flex items-center font-bold">
                        <Link to="/perfil" className="flex items-center z-10"> 

                            <img className="w-[40px] h-[40px] rounded-[50%] mr-[10px] 
                                object-cover transition-all duration-[0.4s] 
                                ease-in-out hover:scale-[1.1]" 
                                src={currentUser.avatarURL || "/noavatar.svg"} 
                                alt="Imagem de perfil"
                            />
                            <span className="mr-[20px] hidden md:flex capitalize">
                                {currentUser.username}
                            </span>

                        </Link>
                        <Link className="hidden md:flex relative py-[12px] px-[24px] 
                            bg-[#fece51] hover:bg-[#fece51]/80 
                            dark:hover:bg-[#fece51]/90 cursor-pointer border-0 z-50" 
                            to="/perfil">

                            <div className="absolute -top-[8px] -right-2 bg-red-600 
                            hover:bg-red-600/90 text-white rounded-[50%] w-[26px] 
                            h-[26px] flex items-center justify-center">3</div>
                            <span className="dark:text-black">Perfil</span>

                        </Link>
                    </div>
                ) : (
                    <>
                        <Link to="/entrar" className="hidden md:flex z-10 py-[12px] 
                            px-[24px] transition duration-[0.4s] ease-in-out 
                            hover:scale-[1.1]">
                            Entrar
                        </Link>
                        <Link to="/cadastrar" className="hidden md:flex z-10 bg-[#fece51] rounded-sm 
                            py-[12px] px-[24px] transition duration-[0.4s] ease-in-out hover:scale-[1.1]
                            dark:text-black">
                            Criar conta
                        </Link>
                    </>
                )}
                
                <div ref={buttonRef} className="flex-initial md:hidden cursor-pointer z-30">
                    <img width={36} height={36} src="/menu.svg" alt="Menu" onClick={() => setOpen((prev) => !prev)}/>
                </div>

                <div ref={menuRef} className={`absolute top-0 bg-black text-white h-[100vh] w-[50%] 
                    transition-all duration-[1s] ease-in-out text-[20px]
                    flex flex-col items-center justify-center gap-y-[50px] z-20
                ${open ? "right-0" : "right-[-55%]"} md:hidden`}
                >
                    <Link to="/" className={`${linkClasses}`}>Início</Link>
                    <Link to="/" className={`${linkClasses}`}>Sobre</Link>
                    <Link to="/" className={`${linkClasses}`}>Contatos</Link>
                    {currentUser ? (
                        <>
                            <Link to="/perfil" className={`${linkClasses}`}>Perfil</Link>
                            <Link onClick={handleLogout} to="/" className={`${linkClasses}`}>Sair</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/entrar" className={`${linkClasses}`}>Entrar</Link>
                            <Link to="/cadastrar" className={`${linkClasses}`}>Criar conta</Link>
                        </>
                    )}
                </div>

                {(location.pathname === "/" || location.pathname === "/cadastrar" || location.pathname === "/entrar") && (
                    <div className="absolute bg-[#fcf5f3] dark:bg-[#1a1a1a] rounded-[50%] z-0
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