import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <div
      className={`popup-container ${
        isOpen ? "widget-open" : isToggleOpen ? "open" : "not-open"
      }`}
      style={{ backgroundColor: companyContext.company?.mainColor }}
      onClick={onClick}
    >
      <div className="popup-reservation">
        <span>{t("popup.reserverUneTable")}</span>
      </div>
    </div>
  );
}
