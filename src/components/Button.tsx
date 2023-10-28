import { CompanyContextProps } from "../contexts/CompanyContext";

type ButtonProps = {
  companyContext: CompanyContextProps;
  onClick: () => void;
  isToggleOpen: boolean;
  isOpen: boolean;
  color: string;
};

export default function Button({
  companyContext,
  onClick,
  isToggleOpen,
  isOpen,
  color,
}: ButtonProps) {
  return (
    <div
      className={`resajet-button`}
      style={{
        backgroundColor: companyContext.company?.companySetting?.mainColor,
      }}
      onClick={onClick}
    >
      <span
        className={`${
          isOpen && !isToggleOpen
            ? "open"
            : isOpen
            ? "widget-open"
            : isToggleOpen
            ? "open"
            : "not-open"
        }`}
      >
        <svg
          style={{ marginTop: "6px" }}
          width="32"
          height="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="8" y1="8" x2="24" y2="24" stroke={color} strokeWidth="2" />
          <line x1="8" y1="24" x2="24" y2="8" stroke={color} strokeWidth="2" />
        </svg>
      </span>
    </div>
  );
}
