import { useContext, useEffect, useState } from "react";
import { CompanyContext } from "./contexts/CompanyContext";
import Button from "./components/Button";
import Widget from "./components/Widget";
import Popup from "./components/Popup";
import { useTranslation } from "react-i18next";
import { Test } from "./test/test";

function App() {
  const { i18n } = useTranslation();
  const companyContext = useContext(CompanyContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

  useEffect(() => {
    const language = navigator.language.includes("en")
      ? Test.English
      : navigator.language.includes("nl")
      ? Test.Dutch
      : Test.French;

    i18n.changeLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsToggleOpen(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const getColor = () => {
    if (
      companyContext.company?.companySetting &&
      companyContext.company?.companySetting?.textColor !== null
    ) {
      return companyContext.company?.companySetting?.textColor;
    }
    const backgroundColor = companyContext.company?.companySetting?.mainColor;

    if (backgroundColor === undefined) return "white";

    const background = parseColor(backgroundColor);

    const luminance =
      0.299 * background.r + 0.587 * background.g + 0.114 * background.b;

    return luminance > 128 ? "black" : "white";
  };

  const parseColor = (color: string) => {
    const m = /^#([0-9a-f]{6})$/i.exec(color);
    if (m) {
      const hex = m[1];
      return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16),
      };
    }
    return { r: 0, g: 0, b: 0 };
  };

  return (
    companyContext?.company != null && (
      <div className="resajet-container">
        <div className="resajet-section">
          <Button
            companyContext={companyContext}
            isToggleOpen={isToggleOpen}
            isOpen={isOpen}
            color={getColor()}
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
              color={getColor()}
            />
          )}
          {isOpen && (
            <Widget
              companyContext={companyContext}
              isOpen={isOpen}
              color={getColor()}
              openCloseWidget={() => setIsOpen(!isOpen)}
            />
          )}
        </div>
      </div>
    )
  );
}

export default App;
