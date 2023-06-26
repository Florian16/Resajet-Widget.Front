import { useContext, useState } from "react";
import { RestaurantContext } from "./contexts/RestaurantContext";
import Button from "./components/Button";
import Widget from "./components/Widget";

function App() {
  const restaurantContext = useContext(RestaurantContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="resajet-container">
      <div className="resajet-section">
        <Button
          restaurantContext={restaurantContext}
          onClick={() => setIsOpen(!isOpen)}
        />
        <Widget restaurantContext={restaurantContext} isOpen={isOpen} />
      </div>
    </div>
  );
}

export default App;
