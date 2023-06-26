import React, { ReactNode, useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      const generateGUID = (): string => {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      };
      setRestaurantSettings({
        secondColor: "#EBC80A",
        mainColor: "#DBE0E0",
        restoreOptions: [
          {
            id: generateGUID(),
            name: "Déjeuner",
          },
          {
            id: generateGUID(),
            name: "Dîner",
          },
          {
            id: generateGUID(),
            name: "Souper",
          },
        ],
        maximumCovers: 6,
      });
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
