import { useContext, useState } from "react";
import { CompanyContext } from "./contexts/CompanyContext";
import Button from "./components/Button";
import Widget from "./components/Widget";
import Popup from "./components/Popup";

function App() {
  const companyContext = useContext(CompanyContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(true);

  return (
    companyContext?.company != null && (
      <div className="resajet-container">
        <div className="resajet-section">
          <Button
            companyContext={companyContext}
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
          <Popup
            companyContext={companyContext}
            onClick={() => {
              setIsOpen(!isOpen);
              setIsToggleOpen(!isToggleOpen);
            }}
            isToggleOpen={isToggleOpen}
            isOpen={isOpen}
          />
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
