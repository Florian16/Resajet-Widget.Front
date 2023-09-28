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
    const script = document.querySelector("script[companyId]");

    if (script) {
      const companyId = script.getAttribute("companyId");
      if (companyId) {
        const fetchData = async () => {
          companyService
            .getCompany(companyId?.toString(), i18n.language)
            .then((result) => {
              setCompany(result);
            });
        };

        fetchData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CompanyContext.Provider value={context}>
      {children}
    </CompanyContext.Provider>
  );
};

export { CompanyContext, CompanyProvider };
