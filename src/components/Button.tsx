import CloseIcon from "@mui/icons-material/Close";
import { CompanyContextProps } from "../contexts/CompanyContext";

type ButtonProps = {
  companyContext: CompanyContextProps;
  onClick: () => void;
  isToggleOpen: boolean;
  isOpen: boolean;
};

export default function Button({
  companyContext,
  onClick,
  isToggleOpen,
  isOpen,
}: ButtonProps) {
  return (
    <div
      className={`resajet-button`}
      style={{
        backgroundColor: companyContext.company?.mainColor,
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
        <CloseIcon className="close-icon" />
      </span>
    </div>
  );
}
