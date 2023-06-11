import { RestaurantContextProps } from "../contexts/RestaurantContext";
import { Card } from "@nextui-org/react";

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
      <Card>
        <Card.Header
          css={{ pl: "$12", pt: "$6" }}
          className="resajet-header"
          style={{
            backgroundColor: restaurantContext.restaurantSettings?.secondColor,
          }}
        >
          <span>Réserver maintenant</span>
        </Card.Header>
        <Card.Body
          css={{ background: restaurantContext.restaurantSettings?.mainColor }}
        ></Card.Body>
      </Card>

      <div className="resajet-body"></div>
    </div>
  );
}
