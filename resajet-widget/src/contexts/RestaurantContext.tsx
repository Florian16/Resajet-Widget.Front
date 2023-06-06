import React, { ReactNode, useState } from "react";
import { RestaurantSetting } from "../models/restaurantSetting";

export type RestaurantContextProps = {
  restaurantSettings: RestaurantSetting | null;
};

type RestaurantContextProviderProps = {
  children: ReactNode | ReactNode[];
};

const RestaurantContext = React.createContext<RestaurantContextProps>({
  restaurantSettings: null,
});

const RestaurantProvider = ({ children }: RestaurantContextProviderProps) => {
  const [restaurantSettings, setRestaurantSettings] =
    useState<RestaurantSetting | null>(null);

  const context: RestaurantContextProps = {
    restaurantSettings,
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setRestaurantSettings({ background: "#2596be" });
    };

    fetchData();
  }, []);

  return (
    <RestaurantContext.Provider value={context}>
      {children}
    </RestaurantContext.Provider>
  );
};

export { RestaurantContext, RestaurantProvider };
