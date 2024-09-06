import { useEffect, useState } from "react";

function UploadWidget({ uwConfig, setState }) {
    const [widget, setWidget] = useState(null);

    useEffect(() => {
      const initializeWidget = () => {
        const myWidget = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Sucesso! Aqui estão as informações da sua imagem: ", result.info);
              setState(prev => {
                if (prev.length < 4 && !prev.includes(result.info.secure_url)) {
                    return [...prev, result.info.secure_url];
                }
                
                return prev;
              });
            } else if (error) {
              console.error("Erro durante o upload: ", error);
            }
          }
        );
        setWidget(myWidget);
      };

      const loadScript = () => {
        const script = document.createElement("script");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.async = true;
        script.onload = initializeWidget;
        document.body.appendChild(script);
      };

      if (!window.cloudinary) {
        loadScript();
      } else {
        initializeWidget();
      }
    }, [uwConfig, setState]);

    const handleUploadClick = () => {
      if (widget) {
        widget.open();
      }
    };

    return (
        <button
            id="upload_widget" onClick={handleUploadClick}
            className="flex w-[96%] p-[20px] bg-blue-500 hover:bg-blue-400 border-0 cursor-pointer rounded-[5px] justify-center"
        >
            <div className="text-white font-semibold text-[22px] uppercase flex gap-[15px] items-center">
            <img width={28} height={28} src="/camera.svg" alt="Ícone de câmara" />
                <span>Adicionar imagens (Máx: 4)</span>
            </div>
        </button>
    );
}

export default UploadWidget;