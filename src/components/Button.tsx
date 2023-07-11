import { CompanyContextProps } from "../contexts/CompanyContext";

type ButtonProps = {
  companyContext: CompanyContextProps;
  onClick: () => void;
};

export default function Button({ companyContext, onClick }: ButtonProps) {
  return (
    <div
      className={`resajet-button`}
      style={{
        backgroundColor: companyContext.companySettings?.mainColor,
      }}
      onClick={onClick}
    ></div>
  );
}
