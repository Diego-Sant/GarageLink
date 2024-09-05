import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function UploadWidget({ uwConfig, setAvatar }) {
    const [widget, setWidget] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const [avatar, setLocalAvatar] = useState(currentUser.avatarURL);
  
    useEffect(() => {
      const initializeWidget = () => {
        const myWidget = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Sucesso! Aqui estão as informações da sua imagem: ", result.info);
              setLocalAvatar(result.info.secure_url);
              setAvatar(result.info.secure_url);
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
    }, [uwConfig, setAvatar]);
  
    const handleUploadClick = () => {
      if (widget) {
        widget.open();
      }
    };
  
    return (
      <button
          id="upload_widget"
          className="relative w-full h-full"
          onClick={handleUploadClick}
      >
        <img
            src={avatar || "/noavatar.svg"}
            alt="Imagem de perfil"
            className="w-full h-full object-cover"
        />
        <div
            className="absolute inset-0 bg-gray-600 opacity-0 
            group-hover:opacity-50 transition-opacity duration-300"
        />
        <div
            className="absolute inset-0 flex items-center justify-center 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <img src="/camera.svg" alt="Adicionar Imagem" className="w-10 h-10" />
        </div>
      </button>
    );
  }

export default UploadWidget;