import React, { ReactNode, useState, useEffect } from "react";
import { companyService } from "../services/company.service";
import { CompanySettingDto } from "../dtos/CompanySetting/companySettingDto";

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
        .getCompanySettings("3fa85f64-5717-4562-b3fc-2c963f66afa6")
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
