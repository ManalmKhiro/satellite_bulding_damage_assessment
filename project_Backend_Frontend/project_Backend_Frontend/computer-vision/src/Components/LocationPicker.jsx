import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

function LocationMarker({ location, setLocation }) {

    const [markerPosition, setMarkerPosition] = useState(
        location
            ? [location.latitude, location.longitude]
            : null
    );

    useMapEvents({

        click(e) {

            const lat = e.latlng.lat;
            const lng = e.latlng.lng;

            setMarkerPosition([lat, lng]);

            setLocation({
                latitude: lat,
                longitude: lng,
                village: "Unknown"
            });

        }

    });

    return markerPosition ? (
        <Marker position={markerPosition} />
    ) : null;
}

export default function LocationPicker({ location, setLocation }) {

    return (

        <div
            style={{
                height: "350px",
                borderRadius: "15px",
                overflow: "hidden"
            }}
        >

            <MapContainer
                center={[35.8, 36.6]}
                zoom={9}
                style={{
                    height: "100%",
                    width: "100%"
                }}
            >

                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationMarker
                    location={location}
                    setLocation={setLocation}
                />

            </MapContainer>

        </div>

    );

}