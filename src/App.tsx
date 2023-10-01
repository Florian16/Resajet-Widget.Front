import { useContext, useEffect, useState } from "react";
import { CompanyContext } from "./contexts/CompanyContext";
import Button from "./components/Button";
import Widget from "./components/Widget";
import Popup from "./components/Popup";
import { useTranslation } from "react-i18next";
import { Language } from "./enums/Language";

function App() {
  const { i18n } = useTranslation();
  const companyContext = useContext(CompanyContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

  useEffect(() => {
    const language = navigator.language.includes("en")
      ? Language.English
      : navigator.language.includes("nl")
      ? Language.Dutch
      : Language.French;

    i18n.changeLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsToggleOpen(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    companyContext?.company != null && (
      <div className="resajet-container">
        <div className="resajet-section">
          <Button
            companyContext={companyContext}
            isToggleOpen={isToggleOpen}
            isOpen={isOpen}
            onClick={() => {
              if (isToggleOpen) {
                setIsToggleOpen(false);
              } else if (!isOpen) {
                setIsToggleOpen(true);
              } else {
                setIsOpen(false);
              }
            }}
          />
          {!isOpen && (
            <Popup
              companyContext={companyContext}
              onClick={() => {
                setIsOpen(!isOpen);
                setIsToggleOpen(!isToggleOpen);
              }}
              isToggleOpen={isToggleOpen}
              isOpen={isOpen}
            />
          )}
          {isOpen && (
            <Widget
              companyContext={companyContext}
              isOpen={isOpen}
              openCloseWidget={() => setIsOpen(!isOpen)}
            />
          )}
        </div>
      </div>
    )
  );
}

export default App;
