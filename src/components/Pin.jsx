import L from "leaflet";

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Marker, Popup } from "react-leaflet";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function Pin({ item }) {
    const formatPriceToRent = (price) => price.toFixed(2).replace('.', ',');
    const formatPriceToBuy = (price) => price.toFixed(3);

    let priceDisplay = "";
    if (item.buyOrRent === "Alugar") {
        priceDisplay = `R$ ${formatPriceToRent(item.priceToRent)} p/ dia`;
    } else if (item.buyOrRent === "Comprar") {
        priceDisplay = `R$ ${formatPriceToBuy(item.priceToBuy)}`;
    }
    
    return (
        <Marker position={[item.latitude, item.longitude]}>
            <Popup>
                <div className="p-2 flex flex-col justify-center items-center">
                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    <h2 className="text-md mb-1">{item.address}</h2>
                    <img className="rounded-[5px]" src={item.img} alt={item.title} />
                    <p className="text-[14px] font-semibold">{priceDisplay}</p>
                </div>
            </Popup>
        </Marker>
    )
}

export default Pin;