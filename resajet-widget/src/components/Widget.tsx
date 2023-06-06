import { RestaurantContextProps } from "../contexts/RestaurantContext";

type WidgetProps = {
  restaurantContext: RestaurantContextProps;
  isOpen: boolean;
};

export default function Widget({ restaurantContext, isOpen }: WidgetProps) {
  return (
    <div
      className={`resajet-widget ${
        isOpen ? "resajet-widget-open" : "resajet-widget-close"
      }`}
    >
      <div
        className="resajet-header"
        style={{
          backgroundColor: restaurantContext.restaurantSettings?.background,
        }}
      >
        <span>Réservation</span>
      </div>
      <div className="resajet-body"></div>
    </div>
  );
}
