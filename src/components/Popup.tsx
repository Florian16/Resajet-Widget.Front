import { CompanyContextProps } from "../contexts/CompanyContext";

type PopupProps = {
  companyContext: CompanyContextProps;
  onClick: () => void;
  isToggleOpen: boolean;
  isOpen: boolean;
};
export default function Popup({
  companyContext,
  onClick,
  isToggleOpen,
  isOpen,
}: PopupProps) {
  return (
    <div
      className={`popup-container ${
        isOpen ? "widget-open" : isToggleOpen ? "open" : "not-open"
      }`}
      style={{ backgroundColor: companyContext.company?.mainColor }}
      onClick={onClick}
    >
      <div className="popup-reservation">
        <span>Réserver une table</span>
      </div>
    </div>
  );
}
