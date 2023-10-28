import { useTranslation } from "react-i18next";
import { CompanyContextProps } from "../contexts/CompanyContext";
import { CompanyType } from "../enums/CompanyType";

type PopupProps = {
  companyContext: CompanyContextProps;
  onClick: () => void;
  isToggleOpen: boolean;
  isOpen: boolean;
  color: string;
};
export default function Popup({
  companyContext,
  onClick,
  isToggleOpen,
  isOpen,
  color,
}: PopupProps) {
  const { t } = useTranslation();
  return (
    <div
      className={`popup-container ${
        isOpen ? "widget-open" : isToggleOpen ? "open" : "not-open"
      }`}
      style={{
        backgroundColor: companyContext.company?.companySetting?.mainColor,
        color: color,
      }}
      onClick={onClick}
    >
      <div className="popup-reservation">
        <span>
          {companyContext?.company?.type === CompanyType.Restaurant
            ? t("popup.reserverUneTable")
            : companyContext?.company?.type === CompanyType.Housing
            ? t("popup.reserverMaintenant")
            : t("popup.reserverUneTable")}
        </span>
      </div>
    </div>
  );
}
