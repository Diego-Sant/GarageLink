import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

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

export default function Map({ items }) {
    useEffect(() => {
        const existingMap = L.DomUtil.get("map");
        if (existingMap && existingMap._leaflet_id) {
            existingMap._leaflet_id = null;
        }

        const map = L.map("map", {
            center: items.length === 1 ? [items[0].latitude, items[0].longitude]
                : [-10.643679633359264, -50.553905922952076],
            zoom: items.length === 1 ? 7 : 3,
            dragging: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            boxZoom: true,
            touchZoom: true,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);

        items.forEach(item => {
            const popupContent = `
                <div class="p-2 flex flex-col justify-center items-center">
                    <h3 class="text-lg font-bold mb-1">${item.title}</h3>
                    <h2 class="text-md mb-1">${item.address}</h2>
                    <img class="rounded-[5px]" src="${item.images[0]}" alt="${item.title}" />
                    <p class="text-[14px] font-semibold">${item.buyOrRent === "Alugar" ? 
                        `R$ ${item.priceToRent.toFixed(2).replace('.', ',')} p/ dia` : 
                        `R$ ${item.priceToBuy.toFixed(3)}`}</p>
                </div>
            `;

            L.marker([item.latitude, item.longitude], { icon: DefaultIcon }).addTo(map)
                .bindPopup(popupContent);
        });

        return () => {
            map.remove();
        };
    }, [items]);

    return <div id="map" className="w-[100%] h-[100%] rounded-[20px]"></div>;
}