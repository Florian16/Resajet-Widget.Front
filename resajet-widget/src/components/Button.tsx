import { RestaurantContextProps } from "../contexts/RestaurantContext";

type ButtonProps = {
  restaurantContext: RestaurantContextProps;
  onClick: () => void;
};

export default function Button({ restaurantContext, onClick }: ButtonProps) {
  return (
    <div
      className={`resajet-button`}
      style={{
        backgroundColor: restaurantContext.restaurantSettings?.secondColor,
      }}
      onClick={onClick}
    ></div>
  );
}
