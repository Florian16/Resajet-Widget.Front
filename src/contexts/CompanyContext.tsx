import React, { ReactNode, useState, useEffect } from "react";
import { companyService } from "../services/company.service";
import { CompanyDto } from "../dtos/Company/CompanyDto";
import { useTranslation } from "react-i18next";

export type CompanyContextProps = {
  company: CompanyDto | null;
};

type CompanyContextProviderProps = {
  children: ReactNode | ReactNode[];
};

const CompanyContext = React.createContext<CompanyContextProps>({
  company: null,
});

const CompanyProvider = ({ children }: CompanyContextProviderProps) => {
  const { i18n } = useTranslation();
  const [company, setCompany] = useState<CompanyDto | null>(null);

  const context: CompanyContextProps = {
    company,
  };

  useEffect(() => {
    const fetchData = async () => {
      companyService
        .getCompany("20ce1e94-21c7-46d9-8795-6cbf7e05737e", i18n.language)
        .then((result) => {
          setCompany(result);
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
