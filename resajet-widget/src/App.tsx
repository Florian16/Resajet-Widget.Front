import { useContext } from "react";
import { RestaurantContext } from "./contexts/RestaurantContext";

function App() {
  const restaurantContext = useContext(RestaurantContext);
  return (
    <div className="relative">
      <div className="absolute z-9">
        <div
          className="resajet-button"
          style={
            restaurantContext && restaurantContext.restaurantSettings
              ? { background: restaurantContext.restaurantSettings.color }
              : undefined
          }
        ></div>
      </div>
    </div>
  );
}

export default App;
