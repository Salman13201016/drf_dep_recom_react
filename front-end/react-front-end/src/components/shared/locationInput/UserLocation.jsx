import { useState } from "react";

const UserLocation = () => {
    const [position, setPosition] = useState({
      latitude: null,
      longitude: null,
    });
    const handleUserLocation = () =>{
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function (position) {
            setPosition({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            console.log(position.coords.latitude, position.coords.longitude);
          });
        } else {
          console.log("Geolocation is not available in your browser.");
        }
    }
  return (
    <div>
        <button onClick={handleUserLocation}>Nearest Hospital</button>
    </div>
  )
}

export default UserLocation