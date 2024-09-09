import { useState } from 'react';

function DarkLightButton({ topic, changeTopic }) {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    changeTopic();
    setTimeout(() => {
      setAnimate(false);
    }, 500);
  };

  return topic !== 'dark' ? (
    <div onClick={handleClick} className="flex items-center justify-center z-10
      sm:justify-start cursor-pointer rounded-full p-1 bg-gradient-to-r 
      from-yellow-300 to-yellow-600 w-8 sm:w-24 h-8">

      <div className={`flex items-center justify-center sm:bg-white 
        sm:text-yellow-600 w-6 h-6 rounded-full sm:mr-2 
        ${animate ? 'animate-slide-right' : ''}`}>
        <img src="/sun.svg" alt="" />
      </div>
      
      <div className="hidden sm:flex text-md text-white">
        <span>Claro</span>
      </div>

    </div>
  ) : (
    <div onClick={handleClick} className="flex items-center justify-center z-10
    sm:justify-end cursor-pointer rounded-full p-1 bg-gradient-to-r 
    from-gray-500 to-gray-900 w-8 sm:w-24 h-8">
      
      <div className="hidden sm:flex text-md">
        <span>Escuro</span>
      </div>

      <div className={`flex items-center justify-center sm:bg-white 
        sm:text-gray-500 w-6 h-6 rounded-full sm:ml-2 
        ${animate ? 'animate-slide-left' : ''}`}>
        <img src="/moon.svg" alt="" />
      </div>

    </div>
  );
}

export default DarkLightButton;