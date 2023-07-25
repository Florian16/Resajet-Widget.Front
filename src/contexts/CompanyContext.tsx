import React, { ReactNode, useState, useEffect } from "react";
import { companyService } from "../services/company.service";
import { CompanySettingDto } from "../dtos/CompanySetting/CompanySettingDto";

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
      companyService
        .getCompanySettings("46f463f5-07c6-491c-a353-ab0ce4ab3b77")
        .then((result) => {
          setCompanySettings(result);
        })
        .catch((error) => "error " + console.log(error));
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
