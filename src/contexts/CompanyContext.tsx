import React, { ReactNode, useState, useEffect } from "react";
import { CompanySettingDto } from "../dtos/companySettingDto";
import { Language } from "../enums/language";
import { Area } from "../models/area";
import { Period } from "../models/period";

export type CompanyContextProps = {
  companySettings: CompanySettingDto | null;
};

type CompanyContextProviderProps = {
  children: ReactNode | ReactNode[];
};

const CompanyContext = React.createContext<CompanyContextProps>({
  companySettings: null,
});

const CompanyProvider = ({ children }: CompanyContextProviderProps) => {
  const [companySettings, setCompanySettings] =
    useState<CompanySettingDto | null>(null);

  const context: CompanyContextProps = {
    companySettings,
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

      const periods: Period[] = [
        {
          id: generateGUID(),
          periodTranslations: [
            {
              language: Language.French,
              name: "Déjeuner",
            },
            {
              language: Language.English,
              name: "Breakfast",
            },
            {
              language: Language.Dutch,
              name: "Ontbijten",
            },
          ],
        },
        {
          id: generateGUID(),
          periodTranslations: [
            {
              language: Language.French,
              name: "Dîner",
            },
            {
              language: Language.English,
              name: "Lunch",
            },
            {
              language: Language.Dutch,
              name: "Lunch",
            },
          ],
        },
        {
          id: generateGUID(),
          periodTranslations: [
            {
              language: Language.French,
              name: "Souper",
            },
            {
              language: Language.English,
              name: "Dinner",
            },
            {
              language: Language.Dutch,
              name: "Avondeten",
            },
          ],
        },
      ];

      const areas: Area[] = [
        {
          id: generateGUID(),
          areaTranslations: [
            {
              language: Language.French,
              name: "Intérieur",
            },
            {
              language: Language.English,
              name: "Indoor",
            },
            {
              language: Language.Dutch,
              name: "Binnen",
            },
          ],
        },
        {
          id: generateGUID(),
          areaTranslations: [
            {
              language: Language.French,
              name: "Extérieur",
            },
            {
              language: Language.English,
              name: "Outdoor",
            },
            {
              language: Language.Dutch,
              name: "Buiten",
            },
          ],
        },
      ];

      setCompanySettings({
        mainColor: "#EBC80A",
        periods,
        maximumReservations: 6,
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
            mealPeriodId: periods[0].id,
          },
          {
            id: generateGUID(),
            hour: "07:30:00",
            mealPeriodId: periods[0].id,
          },
          {
            id: generateGUID(),
            hour: "08:00:00",
            mealPeriodId: periods[0].id,
          },
          {
            id: generateGUID(),
            hour: "08:30:00",
            mealPeriodId: periods[0].id,
          },
          {
            id: generateGUID(),
            hour: "09:00:00",
            mealPeriodId: periods[0].id,
          },
          {
            id: generateGUID(),
            hour: "09:30:00",
            mealPeriodId: periods[0].id,
          },
          {
            id: generateGUID(),
            hour: "10:00:00",
            mealPeriodId: periods[0].id,
          },
          {
            id: generateGUID(),
            hour: "11:30:00",
            mealPeriodId: periods[1].id,
          },
          {
            id: generateGUID(),
            hour: "12:00:00",
            mealPeriodId: periods[1].id,
          },
          {
            id: generateGUID(),
            hour: "12:30:00",
            mealPeriodId: periods[1].id,
          },
          {
            id: generateGUID(),
            hour: "13:00:00",
            mealPeriodId: periods[1].id,
          },
          {
            id: generateGUID(),
            hour: "13:30:00",
            mealPeriodId: periods[1].id,
          },
          {
            id: generateGUID(),
            hour: "14:00:00",
            mealPeriodId: periods[1].id,
          },
          {
            id: generateGUID(),
            hour: "18:00:00",
            mealPeriodId: periods[2].id,
          },
          {
            id: generateGUID(),
            hour: "18:30:00",
            mealPeriodId: periods[2].id,
          },
          {
            id: generateGUID(),
            hour: "19:00:00",
            mealPeriodId: periods[2].id,
          },
          {
            id: generateGUID(),
            hour: "19:30:00",
            mealPeriodId: periods[2].id,
          },
          {
            id: generateGUID(),
            hour: "20:00:00",
            mealPeriodId: periods[2].id,
          },
          {
            id: generateGUID(),
            hour: "20:30:00",
            mealPeriodId: periods[2].id,
          },
          {
            id: generateGUID(),
            hour: "21:00:00",
            mealPeriodId: periods[2].id,
          },
        ],
        areas,
      });
    };

    fetchData();
  }, []);

  return (
    <CompanyContext.Provider value={context}>
      {children}
    </CompanyContext.Provider>
  );
};

export { CompanyContext, CompanyProvider };
