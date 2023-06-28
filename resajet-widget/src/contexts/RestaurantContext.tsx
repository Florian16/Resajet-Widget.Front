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

      const restoreOptions = [
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
      ];

      const areas = [
        {
          id: generateGUID(),
          name: "Intérieur",
        },
        {
          id: generateGUID(),
          name: "Extérieur",
        },
      ];

      setRestaurantSettings({
        mainColor: "#EBC80A",
        restoreOptions,
        maximumCovers: 6,
        disabledDates: [
          new Date(2023, 5, 5),
          new Date(2023, 5, 6),
          new Date(2023, 5, 12),
          new Date(2023, 5, 13),
          new Date(2023, 5, 19),
          new Date(2023, 5, 20),
          new Date(2023, 5, 26),
          new Date(2023, 5, 27),
          new Date(2023, 6, 3),
          new Date(2023, 6, 4),
          new Date(2023, 6, 10),
          new Date(2023, 6, 11),
          new Date(2023, 6, 17),
          new Date(2023, 6, 18),
          new Date(2023, 6, 24),
          new Date(2023, 6, 25),
          new Date(2023, 6, 31),
          new Date(2023, 7, 1),
          new Date(2023, 7, 7),
          new Date(2023, 7, 8),
          new Date(2023, 8, 4),
          new Date(2023, 8, 5),
        ],
        timeSlots: [
          {
            id: generateGUID(),
            hour: "07:00:00",
            mealPeriodId: restoreOptions[0].id,
          },
          {
            id: generateGUID(),
            hour: "07:30:00",
            mealPeriodId: restoreOptions[0].id,
          },
          {
            id: generateGUID(),
            hour: "08:00:00",
            mealPeriodId: restoreOptions[0].id,
          },
          {
            id: generateGUID(),
            hour: "08:30:00",
            mealPeriodId: restoreOptions[0].id,
          },
          {
            id: generateGUID(),
            hour: "09:00:00",
            mealPeriodId: restoreOptions[0].id,
          },
          {
            id: generateGUID(),
            hour: "09:30:00",
            mealPeriodId: restoreOptions[0].id,
          },
          {
            id: generateGUID(),
            hour: "10:00:00",
            mealPeriodId: restoreOptions[0].id,
          },
          {
            id: generateGUID(),
            hour: "11:30:00",
            mealPeriodId: restoreOptions[1].id,
          },
          {
            id: generateGUID(),
            hour: "12:00:00",
            mealPeriodId: restoreOptions[1].id,
          },
          {
            id: generateGUID(),
            hour: "12:30:00",
            mealPeriodId: restoreOptions[1].id,
          },
          {
            id: generateGUID(),
            hour: "13:00:00",
            mealPeriodId: restoreOptions[1].id,
          },
          {
            id: generateGUID(),
            hour: "13:30:00",
            mealPeriodId: restoreOptions[1].id,
          },
          {
            id: generateGUID(),
            hour: "14:00:00",
            mealPeriodId: restoreOptions[1].id,
          },
          {
            id: generateGUID(),
            hour: "18:00:00",
            mealPeriodId: restoreOptions[2].id,
          },
          {
            id: generateGUID(),
            hour: "18:30:00",
            mealPeriodId: restoreOptions[2].id,
          },
          {
            id: generateGUID(),
            hour: "19:00:00",
            mealPeriodId: restoreOptions[2].id,
          },
          {
            id: generateGUID(),
            hour: "19:30:00",
            mealPeriodId: restoreOptions[2].id,
          },
          {
            id: generateGUID(),
            hour: "20:00:00",
            mealPeriodId: restoreOptions[2].id,
          },
          {
            id: generateGUID(),
            hour: "20:30:00",
            mealPeriodId: restoreOptions[2].id,
          },
          {
            id: generateGUID(),
            hour: "21:00:00",
            mealPeriodId: restoreOptions[2].id,
          },
        ],
        areas,
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
