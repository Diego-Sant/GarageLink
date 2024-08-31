import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin";

function Map({ items }) {
    return (
        <MapContainer className="w-[100%] h-[100%] rounded-[20px]"
            center={[-23.59105941675351, -46.69087039560111]} zoom={7} 
            scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {items.map(item => (
            <Pin item={item} key={item.id}/>
        ))}
      </MapContainer>
    )
}

export default Map;