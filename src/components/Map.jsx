import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Pin from "./Pin";

function Map({ items }) {
    return (
        <MapContainer className="w-[100%] h-[100%] rounded-[20px]"
            center={items.length === 1 ? [items[0].latitude , items[0].longitude] : [-10.643679633359264, -50.553905922952076]} 
            zoom={items.length === 1 ? 7 : 3} 
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