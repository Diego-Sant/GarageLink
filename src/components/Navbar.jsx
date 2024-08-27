function Navbar() {
    return (
        <nav className="flex text-center items-center justify-between mt-[40px]">
            <div className="flex items-center flex-[3] gap-[50px]">
                <a href="/" className="flex items-center gap-[10px] transition duration-[0.4s] ease-in-out hover:scale-[1.1]">
                    <img className="" width={60} height={60} src="/logo.svg" alt="Logo GarageLink" />
                    <span className="font-bold text-[20px]">GarageLink</span>
                </a>
                <a href="/" className="transition duration-[0.4s] ease-in-out hover:scale-[1.1]">Início</a>
                <a href="/" className="transition duration-[0.4s] ease-in-out hover:scale-[1.1]">Sobre</a>
                <a href="/" className="transition duration-[0.4s] ease-in-out hover:scale-[1.1]">Contatos</a>
            </div>
            <div className="flex flex-[2] justify-end gap-[10px] items-center">
                <a href="/" className="z-10 py-[12px] px-[24px] transition duration-[0.4s] ease-in-out hover:scale-[1.1]">Entrar</a>
                <a href="/" className="z-10 bg-[#fece51] rounded-sm py-[12px] px-[24px] transition duration-[0.4s] ease-in-out hover:scale-[1.1]">Criar conta</a>
                <div className="absolute bg-[#fcf5f3] rounded-[50%] z-0
                    hidden lg:block
                    lg:top-[-20%] lg:right-[-20%] lg:w-[800px] lg:h-[800px]
                    xl:top-[-25%] xl:right-[-17%] xl:w-[1000px] xl:h-[1000px]
                    2xl:top-[-25%] 2xl:right-[-13%] 2xl:w-[1100px] 2xl:h-[1100px]"
                ></div>
            </div>
        </nav>
    )
}

export default Navbar;